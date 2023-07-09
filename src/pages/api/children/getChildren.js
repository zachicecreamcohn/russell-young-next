import MySQL from "../_common/MySQL/MySQL";
export default async function handler(req, res) {
  const db = new MySQL();

  try {
    const data = await db.query(`
    SELECT childID, child.parentID, series.series, parent.title, subTitle2, parent.year, parent.medium, parent.size, cloudflare_image_id
    FROM child
    JOIN parent ON child.parentID = parent.parentID 
    JOIN series ON parent.seriesID = series.seriesID WHERE child.archived = false
    `);

    const children = data.map(row => {
      const {
        childID,
        parentID,
        series,
        title: parentTitle,
        subTitle2,
        year,
        medium,
        size,
        cloudflare_image_id,
      } = row;

      const imageID = cloudflare_image_id ? `https://imagedelivery.net/5mGz3Xk8mbYIWkWOJDc_Vg/${cloudflare_image_id}/public` : null;

      return {
        childID,
        parentID,
        seriesTitle: series,
        parentTitle,
        subTitle2,
        medium,
        year,
        size,
        imageID,
      };
    });

    res.status(200).json({
      success: true,
      children,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}
