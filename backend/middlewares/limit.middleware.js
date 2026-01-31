const db = require("../config/db");

const membershipLimits = {
  A: { max_article: 3, max_video: 3 },
  B: { max_article: 10, max_video: 10 },
  C: { max_article: Infinity, max_video: Infinity },
};

exports.checkContentLimit = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const membershipType = req.user.membership_type;

    // Ambil content yang mau dibuka
    const contentId = req.params.id;
    const contentResult = await db.query(
      "SELECT type FROM contents WHERE id = $1",
      [contentId]
    );

    if (contentResult.rows.length === 0) {
      return res.status(404).json({ message: "Content not found" });
    }

    const contentType = contentResult.rows[0].type; // article | video
    const limit = membershipLimits[membershipType];

    // Ambil semua konten yang sudah diakses oleh user untuk tipe ini
    const accessResult = await db.query(
      "SELECT content_id FROM user_access WHERE user_id = $1",
      [userId]
    );

    const accessedIds = accessResult.rows.map(r => r.content_id);

    // Kalau user sudah pernah membuka konten ini → langsung next
    if (accessedIds.includes(parseInt(contentId))) {
      return next();
    }

    // Hitung berapa konten yang sudah dibuka untuk tipe ini
    const typeAccessResult = await db.query(
      `SELECT COUNT(*) FROM user_access ua
       JOIN contents c ON ua.content_id = c.id
       WHERE ua.user_id = $1 AND c.type = $2`,
      [userId, contentType]
    );

    const countAccessed = parseInt(typeAccessResult.rows[0].count);

    // Cek limit membership
    if (countAccessed >= limit[`max_${contentType}`]) {
      return res.status(403).json({
        message: `Limit ${contentType} reached for your membership`,
      });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};