import MySQL from "../_common/MySQL/MySQL";

async function deleteParent(db, parentID) {
    // first, set archived to true for all children of this parent
    const query = `UPDATE child SET archived = 1 WHERE parentID = ?`;
    await db.query(query, [parentID]);

    // now, set archived to true for the parent
    const query2 = `UPDATE parent SET archived = 1 WHERE parentID = ?`;
    return await db.query(query2, [parentID]);

}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method Not Allowed" });
        return;
    }
    const db = new MySQL();

    try {
        const { parentID } = req.body;

        const result = await deleteParent(db, parentID);

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