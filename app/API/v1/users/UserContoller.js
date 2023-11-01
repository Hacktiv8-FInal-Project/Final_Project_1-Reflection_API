const { pool } = require("../../../db/index");
const { hashPassword, comparePassword } = require("../../../../utils/bcrypt");
const { generateToken } = require("../../../../utils/jwt");

class UserController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const emailExist = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );
      if (emailExist.rows.length > 0) {
        return res.status(400).json({ 
          message: "Email already used!"
        });
      }
      const hash = hashPassword(password);
      const data = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
        [email, hash]
      );
      console.log(data.rows);
      const user = data.rows[0];
      delete user.password;
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (data.rows.length === 0) {
        return res.status(401).json({ error: "Email not found" });
      } else {
        const user = data.rows[0];
        const isValid = comparePassword(password, user.password);
        if (isValid) {
          const access_token = generateToken({ id: user.id, email: user.email });
          return res.status(200).json({ access_token });
        } else {
          return res.status(400).json({ error: "Invalid password" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
}

module.exports = UserController;
