import MySQL from "../_common/MySQL/MySQL";

        // format the date like : 2023-04-29 13:22:17
        // 2023-05-07T04:13:48.000Z

// check if there is new info in the db
async function existsNewInfoInDB(db, localLastUpdatedDatetime = null) {
    const query = "SELECT MAX(datetime) FROM db_updates";
    const rows = await db.query(query);
    let dbLastUpdatedDatetime = rows[0]['MAX(datetime)'];
    dbLastUpdatedDatetime = dbLastUpdatedDatetime.toISOString().slice(0, 19).replace('T', ' ');

    console.log("dbLastUpdatedDatetime: " + dbLastUpdatedDatetime);
  
    if (localLastUpdatedDatetime == null || localLastUpdatedDatetime == "") {
      return dbLastUpdatedDatetime;
    } else {
      if (dbLastUpdatedDatetime > localLastUpdatedDatetime) {




        return dbLastUpdatedDatetime;
      } else {
        return false;
      }
    }
  }
  
 
  async function fetchData(dbLastUpdatedDatetime) {
    try {
      const db = new MySQL();
  
      // get series names, seriesID, and number of parents
      const seriesStmt = "SELECT seriesid, series FROM series";
      const seriesRows = await db.query(seriesStmt);
  
      const seriesNames = seriesRows.map((row) => {
        return {
          series: row.series,
          seriesID: row.seriesid,
          parentWorks: [],
        };
      });
  
      // now, get all parents from db and, depending on the seriesID, add them to the appropriate array
      const parentStmt =
        "SELECT seriesID, parentID, title, year, medium, size FROM parent ORDER BY title";
      const parentRows = await db.query(parentStmt);
  
      const parents = parentRows.map((row) => {
        return {
          parentID: row.parentID,
          title: row.title,
          year: row.year,
          medium: row.medium,
          size: row.size,
          children: [],
          seriesID : row.seriesID,
        };
      });
  
      // now, get all children from db and, depending on the parentID, add them to the appropriate array
      const childrenStmt = `SELECT c.parentID, c.childID, c.subTitle2 AS title, c.soldOut AS inStock, c.edition, price, cloudflare_image_id
      FROM child c
      INNER JOIN (
        SELECT childID, MAX(date) AS latest_date
        FROM prices
        GROUP BY childID
      ) p ON c.childID = p.childID
      INNER JOIN prices pr ON p.childID = pr.childID AND p.latest_date = pr.date`;
      const childrenRows = await db.query(childrenStmt);
  
      const children = childrenRows.map((row) => {
        return {
          childID: row.childID,
          title: row.title,
          inStock: row.inStock,
          edition: row.edition,
          parentID: row.parentID,
          price: row.price,
          imageID: row.cloudflare_image_id,
        };
      });
  
      // get the examples (int), unsold (int), and RYCA (int) for each child using sql:
      // We use a CTE for this
  
      const childrenIDs = Array.from(new Set(children.map((child) => child.childID)));
  
      const variationsStmt = `WITH max_dates AS (
          SELECT childid, code, date AS max_date
          FROM (
            SELECT childid, code, date, ROW_NUMBER() OVER (PARTITION BY childid, code ORDER BY date DESC) AS rn
            FROM variations
            WHERE childid IN (${childrenIDs.join(",")})
          ) t
          WHERE rn = 1
        ),
        visible_children AS (
          SELECT DISTINCT v.childid, 'true' AS visible
          FROM variations v
          JOIN max_dates md ON v.childid = md.childid AND v.code = md.code AND v.date = md.max_date
          JOIN child c ON v.childid = c.childid
          JOIN parent p ON c.parentid = p.parentid
          JOIN series s ON p.seriesid = s.seriesid
          WHERE v.sold = 0
          AND (v.consigned IN (17, 67, 137, 139, 140) AND v.reconsigned = 0 OR v.reconsigned IN (17, 67, 137, 139, 140))
          AND (v.hide = 0 OR v.hide IS NULL)
          AND s.flag = 1
          AND v.childid IN (${childrenIDs.join(",")})
        ),
        results AS
        (
            SELECT
              v.childid,
              COUNT(CASE WHEN v.sold = 0 THEN 1 END) AS unsold,
              COUNT(*) AS Examples,
              COUNT(CASE WHEN v.sold = 0 AND
                ((v.consigned IN (17, 67, 137, 139, 140) AND v.reconsigned = 0) OR v.reconsigned IN (17, 67, 137, 139, 140))
              THEN 1 END) AS RYCA,
              (SELECT
                CASE
                  WHEN (SELECT COUNT(DISTINCT code) FROM variations WHERE childid=v.childid AND sold = 1) = (SELECT COUNT(DISTINCT code) FROM variations WHERE childid=v.childid)
                  THEN 'true'
                  ELSE 'false'
                END
               ) AS sold_out
            FROM variations v
            JOIN max_dates md ON v.childid = md.childid AND v.code = md.code AND v.date = md.max_date
            GROUP BY v.childid
          )
          SELECT
            r.childid,
            r.unsold,
            r.Examples,
            r.RYCA,
            r.sold_out,
            COALESCE(vc.visible, 'false') AS visible
          FROM results r
          LEFT JOIN visible_children vc ON r.childid = vc.childid
          WHERE r.unsold > 0 OR r.Examples > 0 OR r.RYCA > 0`;
        
        const variationsRows = await db.query(variationsStmt);
        
        variationsRows.forEach((row) => {
          const child = children.find((child) => child.childID === row.childID);
        
          if (child) {
            child.unsold = row.unsold;
            child.examples = row.Examples;
            child.RYCA = row.RYCA;
            child.sold_out = row.sold_out;
            child.visible = row.visible;
          }
        });
        
        // now, add the children to the appropriate parent
        children.forEach((child) => {
          const parent = parents.find((parent) => parent.parentID === child.parentID);
        
          if (parent) {
            parent.children.push(child);
          }

        });

        
        
        parents.forEach((parent) => {
          const series = seriesNames.find((series) => series.seriesID === parent.seriesID);
        
          if (series) {
            series.parentWorks.push(parent);
            console.log(series);
          }

        });
        
        const result = {
          success: true,
          series_names: seriesNames,
          lastUpdatedDatetime: dbLastUpdatedDatetime,
          newInfo: true,
        };
        
        return result;

    } catch (error) {
        console.error(error);
        return {
        success: false,
        error: error.message,
        };
        }
        }          
      

  export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method Not Allowed" });
            return;
          }
     // make sure lastUpdatedDatetime is passed in the request
        var lastUpdatedDatetime = null;
        if (req.body.lastUpdatedDatetime && req.body.lastUpdatedDatetime != "") {
            lastUpdatedDatetime = req.body.lastUpdatedDatetime;
            }


            const db = new MySQL();

            const dbLastUpdatedDatetime = await existsNewInfoInDB(db, lastUpdatedDatetime);
            if (!dbLastUpdatedDatetime) {
                res.status(200).json({ success: true, newInfo: false });
                return;
                } else {
                    const result = await fetchData(dbLastUpdatedDatetime);
                    res.status(200).json(result);
                    return;
                    
                }

    } catch (e) {
      res.status(500).json({ message: e.message })
    }
  }