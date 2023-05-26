import { withIronSession } from "next-iron-session";
import MySQL from "../_common/MySQL/MySQL";
async function handler(req, res) {
    // check if the user is logged in
    const user_id = req.session.get("user_id");
    if (!user_id) {
        res.status(401).json({success: true, loggedIn: false, message: "Not logged in."});
        return;
    } else {
        const db = new MySQL();
        const user_query = "SELECT first_name, last_name, email, username, company FROM users WHERE id = ?";
        const user_result = await db.query(user_query, [user_id]);
        res.status(200).json({success: true, loggedIn: true, user: user_result[0]});
        return;
    }
}


export default withIronSession(handler, {
    password: "%i&^5BAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsR",
    cookieName: "RUSSELLYOUNG",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });





