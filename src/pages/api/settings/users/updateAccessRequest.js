import MySQL from "../../_common/MySQL/MySQL";
import { withIronSession } from "next-iron-session";

async function checkUserPermissions(user_id) {
  //TODO: this function should check if user has permission to "manage_access_requests"
  // For now, just return true
  return true;
}

async function handleUpdate(data) {
  switch (data.approved) {
    case true:
      // update the access_requests table
      const update_query =
        "UPDATE access_requests SET status = 'approved' WHERE id = ?";
      const mysql = new MySQL();
      try {
        await mysql.query(update_query, [data.id]);
        return true;
      } catch (e) {
        throw new Error(e.message);
      }
    case false:
      // set status to "rejected"
      const update_query2 =
        "UPDATE access_requests SET status = 'rejected' WHERE id = ?";
      const mysql2 = new MySQL();
      try {
        await mysql2.query(update_query2, [data.id]);
        return true;
      } catch (e) {
        throw new Error(e.message);
      }
    default:
      throw new Error("Error updating access request.");
  }
}

async function handler(req, res) {
  // check if user is logged in
  const user_id = req.session.get("user_id");
  if (!user_id) {
    res
      .status(401)
      .json({ success: false, loggedIn: false, message: "Not logged in." });
    return;
  }

  // check if user has permission to manage access requests
  if (!(await checkUserPermissions(user_id))) {
    res.status(403).json({ success: false, message: "Unauthorized." });
    return;
  }

  // do the update
  try {
    await handleUpdate(req.body);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message, success: false, e: e });
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
