const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginCompanies = async (req, res) => {
  const { email, password } = req.body;
  const inputPassword = password;
  const value = [email];
  const query = "SELECT * FROM companies WHERE email=$1 AND is_deleted=0";
  const company = await pool
    .query(query, value)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: "err" });
    });
  if (!company) {
    res
      .status(404)
      .json({ success: false, message: "The email doesn't exist" });
    return;
  }
  storedPassword = company.password;
  const passwordCheck = await bcrypt.compare(inputPassword, storedPassword);
  if (!passwordCheck) {
    res.status(403).json({
      message: "The password you’ve entered is incorrect",
    });
    return;
  }
  const payload = {
    companyId: company.id,
    company:company
  };
  console.log(payload);
  const SECRET = process.env.SECRET;
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, SECRET, options);

  res
    .status(200)
    .json({ success: true, massage: "Valid login credentials", token: token, payload:payload });
};

module.exports = { loginCompanies };
