import MySQL from "../../_common/MySQL/MySQL";
import { withIronSession } from "next-iron-session";
import url from "url";

async function getData() {
  const query = `
  select dealers.initials, series.series, parent.title, parent.year, parent.size, child.subTitle2, v1.varid, v1.code, v1.note, v1.flag, prices.date as date, prices.price, dealers.dealer, child.childID, series.seriesID, v1.date, v1.sold, parent.parentID, parent.medium, v1.hide
  from (
     select childid, codeid, max(date) as maxdate
     from variations where hide=0 group by codeid, childid
  ) as v2 inner join variations as v1 on v1.childid = v2.childid and v1.codeid=v2.codeid and v1.date = v2.maxdate left join child on child.childID=v1.childid left join parent on parent.parentID=child.parentID left join series on series.seriesID=parent.seriesID LEFT JOIN dealers ON dealers.dealerid=v1.reconsigned left join prices on prices.childID=child.childID where parent.type=1 and v1.hide=0 and child.soldOut!=2  and v1.consigned=1 and (prices.date=(select max(p1.date) from prices as p1 where p1.childID=child.childID) or prices.date is NULL) order by series.series, parent.title, child.subTitle2, v1.code
  `;

  const mysql = new MySQL();
  return mysql.query(query);
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

    const data = await getData();
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Server error: " + error });
  }
}

export default withIronSession(handler, {
  password:
    "%i&^5BAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsR",
  cookieName: "RUSSELLYOUNG",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
