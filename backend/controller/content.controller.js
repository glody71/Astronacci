const db = require("../config/db");

//getContents
exports.getAllContents = async (req, res) => {
  try {
    const search = req.query.search || ""

    const result = await db.query(
      `SELECT id, title, type, thumbnail_url
       FROM contents
       WHERE title ILIKE $1
       ORDER BY id ASC`, [`%${search}%`]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//getContentDetailLimit
exports.getContentDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    const contentId = req.params.id;

    const result = await db.query(
      "SELECT * FROM contents WHERE id = $1",
      [contentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Content not found" });
    }

    // catat akses (ON CONFLICT biar ga dobel)
    await db.query(
      `INSERT INTO user_access (user_id, content_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [userId, contentId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



