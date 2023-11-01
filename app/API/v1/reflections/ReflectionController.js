const { pool } = require("../../../db/index");

async function createReflection(req, res) {
  const { success, low_point, take_away } = req.body;
  const userid = req.user.id;

  try {
    const postQuery = `
      INSERT INTO Reflections (success, low_point, take_away, userid)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const values = [success, low_point, take_away, userid];
    console.log(userid)
    const newReflection = await pool.query(postQuery, values);

    const response = {
      Id: newReflection.rows[0].id,
      success: newReflection.rows[0].success,
      low_point: newReflection.rows[0].low_point,
      take_away: newReflection.rows[0].take_away,
      UserId: newReflection.rows[0].userid,
      createdAt: newReflection.rows[0].createdat,
      updatedAt: newReflection.rows[0].updatedat,
    };

    res.status(201).json(response);
  } catch (error) {
    console.log(error);
    console.error("Error creating reflection:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getReflection(req, res) {
  const userId = req.user.id;

  try {
    const getQuery = `SELECT id, success, low_point, take_away, UserId, createdAt, updatedAt
    FROM Reflections
    WHERE UserId = $1`;
    const value = [userId];
    const reflections = await pool.query(getQuery, value);
    res.status(200).json(reflections.rows);
  } catch (error) {
    console.error("Error fetching reflections:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateReflection(req, res) {
  try {
    const updateQuery = `UPDATE reflections SET success = $1, low_point = $2, take_away = $3, updatedat = NOW() WHERE id = $4 RETURNING *`

    const { id } = req.params
    const { success, low_point, take_away } = req.body
    const updateReflection = {
      success,
      low_point,
      take_away,
    } 

    const values = [updateReflection.success, updateReflection.low_point, updateReflection.take_away, id]
    const { rows } = await pool.query(updateQuery, values)
    const response = {
      Id: rows[0].id,
      success: rows[0].success,
      low_point: rows[0].low_point,
      take_away: rows[0].take_away,
      UserId: rows[0].userid,
      createdAt: rows[0].createdat,
      updatedAt: rows[0].updatedat,
    };
    
    if (response) {
      res.status(200).json(response)
    } else {
      res.status(401).json({
        message: 'Unauthorized'
      })
    }
    console.log(response);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const findReflectionsById = async (id) => {
  try {
    const findQuery = `SELECT * FROM reflections WHERE id = $1`
    const values = [id]
    const { rows } = await pool.query(findQuery, values)
    return rows[0]
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const deleteReflections = async (req, res) => {
  try {
    const { id } = req.params
    const deleteQuery = `DELETE FROM reflections WHERE id = $1 RETURNING *`
    const values = [id]
    const { rows } = await pool.query(deleteQuery, values)

    if (rows[0].id !== Number(id)) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    res.status(200).json({
      message: 'Success delete'
    })

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createReflection,
  getReflection,
  updateReflection,
  findReflectionsById,
  deleteReflections
};
