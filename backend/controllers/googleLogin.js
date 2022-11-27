const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const googleRegister = async(req,res)=>{
    const {fullName, email ,password} = req.body
    const value = [email];
    const query = "SELECT * FROM users WHERE email=$1";
      const user = await pool
      .query(query, value)
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        res.status(404).json({ success: false, message: "err" });
      });
    if (!user) {
      const { fullName,email ,password} = req.body
    
      const hashedPassword = await bcrypt.hash(password, 10);
      const values = [
        email.toLowerCase(),
        hashedPassword,
        fullName,
      ];
      const query =
        "INSERT INTO users (email,password,fullName) VALUES($1,$2,$3)";
      pool
        .query(query, values)
        .then((result) => {
          res.status(200).json({
            success: true,
            massage: "Account Created Successfully",
          });
        })
        .catch((err) => {
          res.status(409).json({
            success: false,
            massage: "The email already exists",
            err,
          });
        });
    }
    if(user){
    storedPassword = user.password;
    const passwordCheck = await bcrypt.compare(password, storedPassword);
    if (!passwordCheck) {
      res.status(403).json({
        message: "The password you’ve entered is incorrect",
      });
      return;
    }
    const payload = {
      userId: user.id,
      iscompleted: user.iscompleted,
      user:user
    };
    console.log(payload);
    const SECRET = process.env.SECRET;
    const options = {
      expiresIn: "1h",
    };
    const token = jwt.sign(payload, SECRET, options);
  
    res
      .status(200)
      .json({ success: true, massage: "Valid login credentials", token: token, payload:payload});
  }};

  
module.exports={googleRegister}