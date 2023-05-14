import MySQL from "../../_common/MySQL/MySQL";
import { withIronSession } from "next-iron-session";


async function checkUserPermissions(user_id) {
    //TODO: this function should check if user has permission to "manage_access_requests"
    // For now, just return true
    return true;
}

async function getData() {
    const mysql = new MySQL();
    const query = "SELECT * FROM access_requests WHERE status = 'pending'";
    try {
        const result = await mysql.query(query);
        return result;
    }
    catch (e) {
        throw new Error(e.message);
    }

}

async function handler(req, res) {
    // check if user is logged in
    const user_id = req.session.get("user_id");
    if (!user_id) {
        res.status(401).json({ success: false, loggedIn: false, message: "Not logged in." });
        return;
    }

    // check if user has permission to manage access requests
    const userHasPermission = await checkUserPermissions(user_id);
    if (!userHasPermission) {
        res.status(403).json({ success: false, message: "Unauthorized." });
        return;
    }

    // get the data
    try {
        const result = await getData();
        res.status(200).json({success: true, data: result});
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false, e: e })
    }

    return;
}


export default withIronSession(handler, {
    password:
      "%i&^5BAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsR",
    cookieName: "RUSSELLYOUNG",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
  