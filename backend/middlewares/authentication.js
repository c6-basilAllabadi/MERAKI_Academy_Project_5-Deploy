const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {

    if(!req.headers.authorization){
        res.status(403).json({ success: false, message: "Forbidden" });
        return;
    }
  const token = req.headers.authorization.split(" ").pop();
  console.log(token)
 
  const secretKey = process.env.SECRET;

  jwt.verify(token, secretKey, (err, token) => {
    if (err) {
      console.log(err)
      res.status(403).json({ success: false, message: "The token is invalid or expired" });
      return;
    }
    req.token = token;
    next();
  });
};

module.exports = authentication;