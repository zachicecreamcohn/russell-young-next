import MySQL from "../_common/MySQL/MySQL";

async function addParent(db, data) {
    // confirm that title is not empty or null or undefined
    if (!data.title || data.title.trim() === "") {
        throw new Error("Title is required");
    }

    if (!data.year || data.year.trim() === "") {
        throw new Error("Year is required");
    }



    const query = `INSERT INTO parent (title, subTitle, year, medium, size, seriesID, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [data.title, data.subTitle, data.year, data.medium, data.size, data.seriesID, data.notes];
    
    try {
        const result = await db.query(query, params);
        return result.insertId;
    }
    catch (e) {
        throw new Error(e.message);
    }

}

export default async function handler(req, res) {
    const db = new MySQL();

    try {
        const parentID = await addParent(db, req.body);
        res.status(200).json({
            success: true,
            parentID,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
}