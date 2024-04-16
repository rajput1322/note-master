// middleware ik function hota h aur jabb jab ja chaiya ho tab tak ma isko fetch kr sakta hu and second arguments pass kr duga uska baad ma iska (req ,res) wala function run kruga

var jwt = require("jsonwebtoken");
const JWT_SECRET = "nikhilisagood$oy";

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object

  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      next();
    
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });  }
};

module.exports = fetchuser;
