import MySQL from "../_common/MySQL/MySQL";
const bcrypt = require("bcrypt");
import { withIronSession } from "next-iron-session";



async function authenticateUser(email, username, password) {
  const db = new MySQL();

  const authQuery = "SELECT id, password FROM users WHERE email = ? OR username = ?";
  const authResponse = await db.query(authQuery, [email, username]);

    if (authResponse.length === 0) {
        return {success: false, message: 'Invalid username/email or password.'}
    }

    // log the response
    const user_id = authResponse[0].id;
    const hashedPassword = authResponse[0].password;

    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
        return {success: false, message: 'Invalid username/email or password.'}
    }

    return {success: true, user_id: user_id};
}

async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({error: "Method Not Allowed"});
        return;
    }

    const {email, username, password} = req.body;
    const authResponse = await authenticateUser(email, username, password);
    if (!authResponse.success) {
        res.status(401).json(authResponse);
        return;
    }

    const user_id = authResponse.user_id;
    // set the session
    req.session.set("user_id", user_id);
    await req.session.save();

    res.status(200).json({success: true});
}

export default withIronSession(handler, {
    password: "%i&^5BAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsR",
    cookieName: "RUSSELLYOUNG",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });





