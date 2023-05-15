import MySQL from "../../_common/MySQL/MySQL";
import { withIronSession } from "next-iron-session";


async function createDefaultSettings(user_id) {
    // create default settings for the logged in user 
    // this function is called only if the user has no settings
    const mysql = new MySQL();

    const query = `INSERT INTO settings (user_id) VALUES (?)`; // this works because the default values are set in the database
    try {
        await mysql.query(query, [user_id]);
        return true;
    }
    catch (e) {
        throw new Error(e.message);
    }
}


async function checkForSettings(user_id) {
    // check if preferences exist for the logged in user
    const mysql = new MySQL();
    const query = "SELECT * FROM settings WHERE user_id = ?";
    try {
        const result = await mysql.query(query, [user_id]);
        if (result.length === 0) {
            // no settings exist for this user
            // create default settings
            const defaultSettingsCreated = await createDefaultSettings(user_id);
            if (!defaultSettingsCreated) {
                throw new Error('Error creating default settings.');
            }
        }
        return true;
    }
    catch (e) {
        throw new Error(e.message);
    }

}

async function getPreferences(user_id) {
    let preferences = {};
    // get preferences for the logged in user
    const mysql = new MySQL();
    const query = "SELECT * FROM settings WHERE user_id = ?";
    try {
        const result = await mysql.query(query, [user_id]);
        let preferencesFromSettings = result[0];
        let data = {
            "sold_out_start_hidden": preferencesFromSettings.sold_out_start_hidden,
            "default_series_order": preferencesFromSettings.default_series_order,
            "series_start_collapsed": preferencesFromSettings.series_start_collapsed,
        }

        // insert the data into the preferences object at the root level
        Object.assign(preferences, data);
    }
    catch (e) {
        throw new Error(e.message);
    }

    // then, check for series priority listing
    const seriesPriorityQuery = "SELECT priority, priority_series.series_id, series.series FROM priority_series JOIN series ON priority_series.series_id = series.seriesID WHERE user_id = ? ORDER BY priority ASC";
    try {
        const seriesPriorityResult = await mysql.query(seriesPriorityQuery, [user_id]);
        let seriesPriority = [];
        seriesPriorityResult.forEach(row => {
            seriesPriority.push({
                "priority": row.priority,
                "series_id": row.series_id,
                "series": row.series
            });
        });
        // insert the series priority into the preferences object
        preferences.series_priority = seriesPriority;
    }
    catch (e) {
        throw new Error(e.message);
    }


    // check for default series 
    const defaultSeriesQuery = "SELECT default_series.series_id, series.series FROM default_series JOIN series ON default_series.series_id = series.seriesID WHERE user_id = ?";
    try {
        const defaultSeriesResult = await mysql.query(defaultSeriesQuery, [user_id]);
        let defaultSeries = [];
        defaultSeriesResult.forEach(row => {
            defaultSeries.push({
                "series_id": row.series_id,
                "series": row.series
            });
        });

        // insert the default series into the preferences object
        preferences.defaultSeries = defaultSeries;
    }
    catch (e) {
        throw new Error(e.message);
    }

    // now, return the preferences object
    return preferences;
}





async function handler(req, res) {
    // make sure they are logged in
    if (!req.session.get("user_id")) {
        res.status(401).json({ success: false, error: "Unauthorized" });
        return;
    }
    const userID = req.session.get("user_id");


    await checkForSettings(userID);
    const preferences = await getPreferences(userID);


    res.status(200).json({ success: true, preferences: preferences });

}

  export default withIronSession(handler, {
    password: "%i&^5BAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsRBAV87@CZn7Za8^ybyT4*kMsR",
    cookieName: "RUSSELLYOUNG",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
