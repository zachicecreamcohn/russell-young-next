import MySQL from "../_common/MySQL/MySQL";
import updateDatetimeLastModified from "../_common/DB/utils";

// Functions for updating specific fields in the database
async function updateField(childID, field, value) {
  if (field === "color") {

    const db = new MySQL();
    try {
      await db.query(`UPDATE child SET subTitle2 = ? WHERE childID = ?`, [
        value,
        childID,
      ]);
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  } else if (field === "series") {
    // the field that needs to be updated is in the series table
    const db = new MySQL();

    // get parentID from childID
    const parentID = await db.query(
      `SELECT parentID FROM child WHERE childID = ?`,
      [childID]
    );
    // then get the seriesID from the parent
    const seriesID = await db.query(
      `SELECT seriesID FROM parent WHERE parentID = ?`,
      [parentID[0].parentID]
    );

    // now, update the field in the series table
    try {
      await db.query(`UPDATE series SET series = ? WHERE seriesID = ?`, [
        value,
        seriesID[0].seriesID,
      ]);
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  } else {
    // the fields that need to be updated are in the parent table

    // first, get the parentID from the childID
    const db = new MySQL();

    const parentID = await db.query(
      `SELECT parentID FROM child WHERE childID = ?`,
      [childID]
    );

    // now, update the field in the parent table
    try {
      const query = `UPDATE parent SET ${field} = ? WHERE parentID = ?`;
      await db.query(query, [value, parentID[0].parentID]);
      return true;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  // make sure childID, field, and value are passed in the request
  if (!req.body.childID) {
    res.Error(400, "No childID provided.");
    return;
  } else if (!req.body.field) {
    res.Error(400, "No field provided.");
    return;
  } else if (!req.body.value) {
    res.Error(400, "No value provided.");
    return;
  }

  // get field and value from the request
  const { childID, field, value } = req.body;
  try {
    const result = await updateField(childID, field, value);
    if (!result) {
      res.Error(500, "Error updating field in database.");
    } else {
        const updateSuccess = await updateDatetimeLastModified();
        if (!updateSuccess) {
            throw new Error('Error updating datetimeLastModified in database.');
        }
        
      res.status(200).json({ success: true });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
