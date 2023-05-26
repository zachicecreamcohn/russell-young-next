import MySQL from "../_common/MySQL/MySQL";
const bcrypt = require("bcrypt");



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

async function approvedForAccountCreation(email) {
  const db = new MySQL();

  const access_requests_query =
    "SELECT email FROM access_requests WHERE email = ? AND status = 'approved';";
  const access_requests_result = await db.query(access_requests_query, [email]);
  if (access_requests_result.length > 0) {
    return true;
  }

  return false;
}

async function validateInputs(first, last, email) {
  // use regex to validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Invalid email address." };
  }

  // make sure that first and last name don't contain any special characters
  const nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(first) || !nameRegex.test(last)) {
    return {
      success: false,
      message: "First and last name must not contain any special characters.",
    };
  }

  return true;
}


async function verifyToken(token) {
  const db = new MySQL();

  const query = "SELECT Count(*) FROM users WHERE confirmation_token = ? AND confirmation_expiry > NOW();";

  // execute the query
  const result = await db.query(query, [token])
  if (result.length > 0) {
      return true;
  }

  return false;
}

async function createUser(first, last, email, password, company, token = null) {
  let tokenValid = false;
  if (token !== null) {
    tokenValid = await verifyToken(token);
  }


  // by default, the username will be the email address without the domain
  const username = email.split("@")[0];

  // Generate a salt to use for hashing
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, salt);

  const db = new MySQL();

  if (tokenValid) {
    // update all user details (default is temp data)
    const update_query =
      "UPDATE users SET first_name = ?, last_name = ?, password = ?, username = ?, company = ?, user_confirmed = 1 WHERE confirmation_token = ?;";
    try {
      await db.query(update_query, [
        first,
        last,
        hashedPassword,
        username,
        company,
        token,
      ]);
      return true;
    } catch (e) {
      return false;
    }
  } else {








  let insert_query;
  if (company !== null) {
    insert_query =
      "INSERT INTO users (first_name, last_name, email, password, username, company) VALUES (?, ?, ?, ?, ?, ?)";
    try {
      await db.query(insert_query, [
        first,
        last,
        email,
        hashedPassword,
        username,
        company,
      ]);
      return true;
    } catch (e) {
      return false;
    }
  } else {
    insert_query =
      "INSERT INTO users (first_name, last_name, email, password, username) VALUES (?, ?, ?, ?, ?)";
    try {
      await db.query(insert_query, [
        first,
        last,
        email,
        hashedPassword,
        username,
      ]);
      return true;
    } catch (e) {
      return false;
    }
  }
}
}

async function updateAccessRequest(email) {
  const db = new MySQL();

  const update_query =
    "UPDATE access_requests SET status = 'approved' WHERE email = ?";
  try {
    await db.query(update_query, [email]);
    return true;
  } catch (e) {
    return false;
  }
}

export default async function handler(req, res) {
  // check that the request is a POST request
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  // get all data from the request
  const { first_name, last_name, email, password, company, token } = req.body;

  // if any of the fields are empty, return an error
  if (!first_name || !last_name || !email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
    return;
  }

  // validate the inputs
  const validation = await validateInputs(first_name, last_name, email);
  if (validation !== true) {
    res.status(400).json(validation);
    return;
  }

  let isConfirmation = false;

  if (token !== null) {
    let tokenValid = false;
    tokenValid = await verifyToken(token);
    if (!tokenValid) {
      res.status(400).json({ success: false, message: "Invalid token." });
      return;
    } else {
      isConfirmation = true;
    }


  }
  

  if (!isConfirmation) {

  // check if the user already exists in the database
  const userAlreadyExists = await userExists(email);
  if (userAlreadyExists) {
    res.status(400).json({ success: false, message: "User already exists." });
    return;
  }

  // check if the user has a pending access request
  const accessRequestAlreadyExists = await accessRequestExists(email);
  if (!accessRequestAlreadyExists) {
    res
      .status(400)
      .json({
        success: false,
        message: "No access request found for this email.",
      });
    return;
  }

  // check if the user has been approved for account creation
  const approved = await approvedForAccountCreation(email);
  if (!approved) {
    res
      .status(400)
      .json({
        success: false,
        message: "Access request has not been approved.",
      });
    return;
  }
}
let userCreated;
  // create the user
  if (isConfirmation) {
    userCreated = await createUser(first_name, last_name, email, password, company, token);
  } else {
    userCreated = await createUser(first_name, last_name, email, password, company);
  }
  if (!userCreated) {
    res.status(500).json({ success: false, message: "Error creating user." });
    return;
  }

  if (!isConfirmation) {
  // update the access request
  const accessRequestUpdated = await updateAccessRequest(email);
  if (!accessRequestUpdated) {
    res
      .status(500)
      .json({ success: false, message: "Error updating access request." });
    return;
  }
}

  res.status(200).json({ success: true, message: "User created!" }); //TODO: implement email validation
}
