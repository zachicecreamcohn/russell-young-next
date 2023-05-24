// this endpoint is used to create a new user account from the admin panel.

import MySQL from "../_common/MySQL/MySQL";


async function userExists(email) {
    const db = new MySQL();
  
    const users_query = "SELECT email FROM users WHERE email = ?";
    const users_result = await db.query(users_query, [email]);
  
    if (users_result.length > 0) {
      return true;
    }
  
    return false;
  }


async function accessRequestExists(email) {
    const db = new MySQL();
  
    const access_requests_query =
      "SELECT email FROM access_requests WHERE email = ? AND status != 'rejected';";
    const access_requests_result = await db.query(access_requests_query, [email]);
  
    if (access_requests_result.length > 0) {
      return true;
    }
  
    return false;
  }



async function createUser(email) {

    let confirmation_expiry = new Date();
    // set the expiration date to a week from now
    confirmation_expiry.setDate(confirmation_expiry.getDate() + 7);
    // make it formatted as a mysql datetime
    confirmation_expiry = confirmation_expiry.toISOString().slice(0, 19).replace('T', ' ');

    // generate a random confirmation token
    const confirmation_token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const temp_data = "temp";

    
    const db = new MySQL();
    let insert_query;
      insert_query =
        "INSERT INTO users (first_name, last_name, email, password, username, company, confirmation_token, confirmation_expiry) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      try {
        await db.query(insert_query, [
          temp_data,
          temp_data,
          email,
          temp_data,
          temp_data,
          temp_data,
            confirmation_token,
            confirmation_expiry
        ]);
        return true;
      } catch (e) {
        return false;
      
    }
  }
  

export default async function handler(req, res) {
    // if the request is not a POST request, return an error
    if (req.method !== "POST") {
        res.status(405).json({error: "Method Not Allowed"});
        return;
    }

    // get the email from the request
    const {email} = req.body;

    // check if the user already exists
    const userAlreadyExists = await userExists(email);
    if (userAlreadyExists) {
        res.status(400).json({success: false, message: 'User already exists.'});
        return;
    }

    // check if the user has already requested access
    const accessRequestAlreadyExists = await accessRequestExists(email);
    if (accessRequestAlreadyExists) {
        res.status(400).json({success: false, message: 'Access already requested for this email address. Approve the request from the admin panel.'});
        return;
    }

    // create the user
    const userCreated = await createUser(email);
    if (!userCreated) {
        res.status(500).json({success: false, message: 'Error creating user.'});
        return;
    }

    res.status(200).json({success: true});
}

