import { queries } from "@testing-library/react";
import MySQL from "../_common/MySQL/MySQL";

// A simple insert statement

async function checkIfSeriesExists(db, seriesName) {
  try {
    const query = `SELECT series FROM series WHERE series = ?`;
    const rows = await db.query(query, [seriesName]);
    return rows.length > 0;
  } catch (error) {
    throw error;
  }
}

async function insertSeries(db, seriesName, description) {


  try {
    const query = `INSERT INTO series (series, description) VALUES (?, ?)`;
    const rows = await db.query(query, [seriesName, description]);
    return rows.insertId;
  } catch (error) {
    // log error
    console.log(error);
    throw error; // re-throw the error to handle it later
  }
}

export default async function addSeries(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const { seriesName, description } = req.body;

  // make sure seriesName is passed in the request
  if (!seriesName || seriesName.trim() === "") {
    res.status(400).json({ success: false, error: "Invalid input: seriesName is required" });
    return;
  }

  const db = new MySQL();

  try {
    const seriesExists = await checkIfSeriesExists(db, seriesName);

    if (seriesExists) {
      res.status(200).json({ success: false, seriesExists: true });
      return;
    } else {
      const success = await insertSeries(db, seriesName, description);

      if (success) {
        res.status(200).json({ success: true, seriesExists: false });
        return;
      } else {
        res.status(500).json({ success: false, seriesExists: false, error: "Error adding series" });
        return;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, seriesExists: false, error: "Internal server error" });
    return;
  }
}
