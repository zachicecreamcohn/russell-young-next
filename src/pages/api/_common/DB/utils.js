import MySQL from "../MySQL/MySQL";

async function updateDatetimeLastModified() {
    const mysql = new MySQL();
    let query = "INSERT INTO db_updates (datetime) VALUES (NOW())"
    try {
        const result = await mysql.query(query);
        return {success: true};
    }
    catch (e) {
        throw new Error(e.message);
    }


}





export default updateDatetimeLastModified