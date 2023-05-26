import MySQL from "../_common/MySQL/MySQL";

async function verifyToken(token) {
    const db = new MySQL();

    const query = "SELECT email FROM users WHERE confirmation_token = ? AND confirmation_expiry > NOW();";

    // execute the query
    const result = await db.query(query, [token])
    if (result.length > 0) {
        // return the email address
        return result[0].email;
    }
    else {
        // return false
        return false;
    }
}

export default async function handler(req, res) {
    // check that the request is a POST request
    if (req.method !== "POST") {
        res.status(405).json({error: "Method Not Allowed"});
        return;
    }

    // get the token from the request body
    const {token} = req.body;

    const email = await verifyToken(token);
    if (email) {
        res.status(200).json({success: true, email: email});
    }
    else {
        res.status(400).json({success: false, message: "Invalid token."});
    }

}

