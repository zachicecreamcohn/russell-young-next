import MySQL from "../_common/MySQL/MySQL";

async function handleImageUpload() {
    //TODO: handle image upload
}


async function insertPrice(db, price, childID) {
    const query = `INSERT INTO prices (price, childID) VALUES (?, ?)`;
    const params = [price, childID];

    try {
        const result = await db.query(query, params);
        return result.insertId;
    }
    catch (e) {
        throw new Error(e.message);

    }
}


async function insertChild(db, data) {
    // make sure there is a color
    if (!data.color || data.color.trim() === "") {
        throw new Error("Color is required");
    }

    if (!data.price) data.price = 0;

    const query = `INSERT INTO child (subTitle2, parentID) VALUES (?, ?)`;
    const params = [data.color, data.parentID];

    try {
        const result = await db.query(query, params);
        const childID =  result.insertId;
        await insertPrice(db, data.price, childID);
        // await handleImageUpload();

        return childID;
    }
    catch (e) {
        throw new Error(e.message);
    }

}


export default async function handler(req, res) {
    const db = new MySQL();

    try {
        const childID = await insertChild(db, req.body);
        res.status(200).json({
            success: true,
            childID,
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
}


