import MySQL from "../_common/MySQL/MySQL";

export default async function handler(req, res) {
  const db = new MySQL();

  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }
    const childID = req.body.childID;
    // Check if the childid exists in the database
    const stmt = await db.query(
      `SELECT COUNT(*) FROM child WHERE childid = ?`,
      [childID]
    );
    const count = stmt[0]["COUNT(*)"];

    if (count === 0) {
      res.status(404).json({
        success: false,
        message: "Child ID not found",
      });
      return;
    }

    // Retrieve the data for the child
    const data = {};
    const stmt2 = await db.query(
      `
      SELECT series.series, title, subTitle, subTitle2 as color, year, medium, size, type, notes, description, child.cloudflare_image_id
      FROM parent, child, series
      WHERE child.childid=? AND child.parentid=parent.parentid AND series.seriesid=parent.seriesid
    `,
      [childID]
    );

    const {
      series,
      title,
      subTitle,
      color,
      year,
      medium,
      size,
      type,
      notes,
      description,
      cloudflare_image_id: imageID,
    } = stmt2[0];

    data["summary"] = {
      series,
      title,
      subtitle: subTitle,
      color,
      year,
      medium,
      size,
      type,
      notes,
      description,
      imageID: imageID
        ? imageID
        : null,
    };

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
