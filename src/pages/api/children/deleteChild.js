import MySQL from "../_common/MySQL/MySQL";


async function deleteChild(db, childID) {

    const query = `UPDATE child SET archived = 1 WHERE childID = ?`;
    return await db.query(query, [childID]);
}


export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method Not Allowed" });
        return;
    }
    const db = new MySQL();

    try {
        const { childID } = req.body;

        const result = await deleteChild(db, childID);

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
