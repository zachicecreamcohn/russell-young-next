import MySQL from "../_common/MySQL/MySQL";
import { withIronSession } from "next-iron-session";

async function updatePreferences(data, user_id) {
  const mysql = new MySQL();

  // Update the data from table "settings"
  const settings_query = `UPDATE settings SET sold_out_start_hidden = ?, default_series_order = ?, series_start_collapsed = ? WHERE user_id = ?`;
  try {
    await mysql.query(settings_query, [
      data.showSoldOut,
      data.defaultSeriesSortOrder,
      data.defaultCollapsedState,
      user_id,
    ]);
  } catch (e) {
    throw new Error(e.message);
  }

  // Update the data from table "priority_series"
  const priority_deletion_query = `DELETE FROM priority_series WHERE user_id = ?`;
  try {
    await mysql.query(priority_deletion_query, [user_id]);
  } catch (e) {
    throw new Error(e.message);
  }

  // Insert new rows into "priority_series"
  if (data.seriesPriority.length !== 0) {
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

    try {
      await mysql.query(priority_insertion_query, values);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  // Update the data from table "default_series"
  const default_deletion_query = `DELETE FROM default_series WHERE user_id = ?`;
  try {
    await mysql.query(default_deletion_query, [user_id]);
  } catch (e) {
    throw new Error(e.message);
  }

  // Insert new rows into "default_series"
  if (data.defaultSeries.length !== 0) {
    let default_insertion_query = `INSERT INTO default_series (series_id, user_id) VALUES `;
    const default_values = [];
    for (let i = 0; i < data.defaultSeries.length; i++) {
      default_insertion_query += ` (?, ?)`;
      default_values.push(
        data.defaultSeries[i].series_id,
        user_id
      );
      if (i !== data.defaultSeries.length - 1) {
        default_insertion_query += `, `;
      }
    }

    try {
      await mysql.query(default_insertion_query, default_values);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  return true;
}

async function handler(req, res) {
  try {
    const user_id = req.session.get("user_id");
    const preferences_updated = await updatePreferences(req.body.preferences, user_id);
    if (!preferences_updated) {
      res.json({ success: false, message: "Error updating preferences." });
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message, success: false, e: e });
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
