import MySQL from "../_common/MySQL/MySQL";


async function isEmailAlreadyInDB(email) {
    const db = new MySQL();

    // here, check both the user table and the access_requests tables

    // first, check the user table
    const users_query = "SELECT email FROM users WHERE email = ?";
    const users_result = await db.query(users_query, [email]);
    if (users_result.length > 0) {
        return true;
    }

    // now, check the access_requests table
    const access_requests_query = "SELECT email FROM access_requests WHERE email = ? AND status != 'rejected';";
    const access_requests_result = await db.query(access_requests_query, [email]);
    if (access_requests_result.length > 0) {
        return true;
    }

    return false;
}


async function insertRequest(full_name, email) {
    // first, confirm that the email is formatted correctly with a regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {success: false, message: 'Invalid email address.'}
    }

    // next, check if the email is already in the database
    const emailAlreadyInDB = await isEmailAlreadyInDB(email);
    if (emailAlreadyInDB) {
        return {success: false, message: 'Access already requested for this email address.'}
    }

    // finally, insert the request into the database
    const db = new MySQL();
    const insert_query = "INSERT INTO access_requests (name, email) VALUES (?, ?)";
    try {
        await db.query(insert_query, [full_name, email]);
        return {success: true, message: 'Request submitted.'};
    } catch (e) {
        return {success: false, message: e.message};
    }

}


export default async function handler(req, res) {
    // check that the request is a POST request
    if (req.method !== "POST") {
        res.status(405).json({error: "Method Not Allowed"});
        return;
    }

    // ensure both full_name and email are passed in the request
    if (!req.body.full_name) {
        res.status(400).json({success: false, message: "No full_name provided."});
        return;
    }
    if (!req.body.email) {
        res.status(400).json({success: false, message: "No email provided."});
        return;
    }

    // get full_name and email from the request
    const {full_name, email} = req.body;
    try {
        const result = await insertRequest(full_name, email);
        if (!result.success) {
            res.status(400).json({success: false, message: result.message});
        } else {
            res.status(200).json({success: true, message: result.message});
        }
    }
    catch (e) {
        res.status(500).json({success: false, message: e.message});
    }
}

