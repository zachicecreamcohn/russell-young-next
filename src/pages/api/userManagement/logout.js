import { withIronSession } from "next-iron-session";

async function handler(req, res) {
    // destroy the session
    req.session.destroy();
    res.status(200).json({success: true});
}


export default withIronSession(handler, {
    password: "%i&^5BAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsR",
    cookieName: "RUSSELLYOUNG",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });