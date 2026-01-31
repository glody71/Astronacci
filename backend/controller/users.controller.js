const db = require("../config/db");

exports.userChangeMembership = async (req, res) => {
  try {
    const id = req.params.id;
    const { membership_type } = req.body;

    const result = await db.query(
      "UPDATE users SET membership_type = $1 WHERE id = $2 RETURNING *",
      [membership_type, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Membership updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
