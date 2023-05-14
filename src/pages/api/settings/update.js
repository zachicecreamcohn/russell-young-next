import MySQL from "../_common/MySQL/MySQL";
import { withIronSession } from "next-iron-session";
function updatePreferences(data, user_id) {
  // first, update the data from table "settings":
  //// sold_out_start_hidden | in data.showSoldOut
  //// default_series_order | in data.defaultSeriesSortOrder
  //// series_start_collapsed | in data.defaultCollapsedState
  const mysql = new MySQL();
  const settings_query = `UPDATE settings SET sold_out_start_hidden = ?, default_series_order = ?, series_start_collapsed = ? WHERE user_id = ?`;
  try {
    mysql.query(settings_query, [
      data.showSoldOut,
      data.defaultSeriesSortOrder,
      data.defaultCollapsedState,
      user_id,
    ]);
  } catch (e) {
    throw new Error(e.message);
  }

  // next, update the data from table "priority_series":
  //// priority_series | in data.seriesPriority

  // first, delete all existing rows from the table for this user
  // const mysql = new MySQL();
  const priority_deletion_query = `DELETE FROM priority_series WHERE user_id = ?`;
  try {
    mysql.query(priority_deletion_query, [user_id]);
  } catch (e) {
    throw new Error(e.message);
  }
  // next, build query to insert new rows
  let priority_insertion_query = `INSERT INTO priority_series (user_id, priority, series_id) VALUES `;
  const values = [];
  for (let i = 0; i < data.seriesPriority.length; i++) {
    priority_insertion_query += ` (?, ?, ?)`;
    values.push(
      user_id,
      data.seriesPriority[i].priority,
      data.seriesPriority[i].series_id
    );
    if (i !== data.seriesPriority.length - 1) {
      priority_insertion_query += `, `;
    }
  }

  // finally, insert the new rows
  try {
    mysql.query(priority_insertion_query, values);
  } catch (e) {
    throw new Error(e.message);
  }

    return true;
}

async function handler(req, res) {
    try {
        // get the user_id from the session
        const user_id = req.session.get("user_id");
        const preferences_updated = await updatePreferences(req.body.preferences, user_id);
        if (!preferences_updated) {
            res.json({success: false, message: 'Error updating preferences.'});
        }
        res.json({success: true});
    }
    catch (e) {
        res.status(500).json({ message: e.message, success: false, e: e })
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
