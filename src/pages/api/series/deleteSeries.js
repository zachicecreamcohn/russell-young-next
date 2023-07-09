import MySQL from "../_common/MySQL/MySQL";

async function deleteSeries(db, seriesID) {
    // first, set archived to true for all children of this series
    const query = `UPDATE child SET archived = 1 WHERE parentID IN (SELECT parentID FROM parent WHERE seriesID = ?)`;
    await db.query(query, [seriesID]);

    // now, set archived to true for all parents of this series
    const query2 = `UPDATE parent SET archived = 1 WHERE seriesID = ?`;
    await db.query(query2, [seriesID]);

    // now, set archived to true for the series
    const query3 = `UPDATE series SET archived = 1 WHERE seriesID = ?`;
    return await db.query(query3, [seriesID]);

}


export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method Not Allowed" });
        return;
    }
    const db = new MySQL();

    try {
        const { seriesID } = req.body;

        const result = await deleteSeries(db, seriesID);

        res.status(200).json({
            success: true,
            result,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
}
