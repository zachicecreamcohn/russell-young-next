import { withIronSession } from "next-iron-session";

async function handler(req, res) {
    
    // check if the user is logged in
    const user_id = req.session.get("user_id");
    if (!user_id) {
        res.status(401).json({success: true, loggedIn: false, message: "Not logged in."});
        return;
    } else {
        res.status(200).json({success: true, loggedIn: true});
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
