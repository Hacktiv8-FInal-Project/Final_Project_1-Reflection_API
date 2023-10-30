const { pool } = require("../../../db/index");


async function createReflection(req, res) {
  const { success, low_point, take_away } = req.body;
  const userId = req.user.id;

  try {
    const insertQuery = `
      INSERT INTO Reflections (success, low_point, take_away, UserId)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [success, low_point, take_away, userId];
    const newReflection = await pool.query(insertQuery, values);

    const response = {
      success: newReflection.rows[0].success,
      low_point: newReflection.rows[0].low_point,
      take_away: newReflection.rows[0].take_away,
      UserId: newReflection.rows[0].UserId,
      createdAt: newReflection.rows[0].createdat, 
      updatedAt: newReflection.rows[0].updatedat, 
    };

    res.status(201).json(response);
  } catch (error) {
    console.log(error)
    console.error("Error creating reflection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createReflection,
};
