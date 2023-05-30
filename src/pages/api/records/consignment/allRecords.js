import MySQL from "../../_common/MySQL/MySQL";
import { withIronSession } from "next-iron-session";
import url from "url";

async function getData(pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const query = `
    SELECT series.series, parent.title, parent.year, parent.size, child.subTitle2, v1.varid, v1.code, v1.note, v1.flag, prices.date, prices.price, dealers.dealer, dealers.initials, child.childID
    FROM variations AS v1
    LEFT JOIN child ON child.childID = v1.childid
    LEFT JOIN parent ON parent.parentID = child.parentID
    LEFT JOIN series ON series.seriesID = parent.seriesID
    LEFT JOIN dealers ON dealers.dealerid = v1.reconsigned
    LEFT JOIN prices ON prices.childID = child.childID
    WHERE parent.type = 1
    AND child.soldOut != 2
    AND v1.date = (
      SELECT MAX(v2.date)
      FROM variations AS v2
      WHERE v2.childID = v1.childID
      AND v2.codeid = v1.codeid
    )
    AND (prices.date = (
      SELECT MAX(p1.date)
      FROM prices AS p1
      WHERE p1.childID = child.childID
    ) OR prices.date IS NULL)
    ORDER BY series.series, parent.title, child.subTitle2, v1.code
    LIMIT ?, ?;
  `;

  const mysql = new MySQL();
  return mysql.query(query, [startIndex, pageSize]);
}

async function handler(req, res) {
    // if not post, return error
    if (req.method !== "POST") {
        res.status(405).json({ success: false, error: "Method not allowed" });
        return;
    }


  try {
    const user = req.session.get("user_id");
    if (!user) {
      res.status(401).json({ success: false, error: "Not logged in" });
      return;
    }

    const { pageNumber, pageSize } = req.body;
    if (!pageNumber || !pageSize) {
        res.status(400).json({ success: false, error: "Missing parameters" });
        return;
    }

    // make sure they are numbers
    if (isNaN(pageNumber) || isNaN(pageSize)) {
        res.status(400).json({ success: false, error: "Invalid parameters. Parameters must both be numbers" });
        return;
    }

    const data = await getData(pageNumber, pageSize);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error: " + error });
  }
}

export default withIronSession(handler, {
  password: "%i&^5BAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsR",
  cookieName: "RUSSELLYOUNG",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
