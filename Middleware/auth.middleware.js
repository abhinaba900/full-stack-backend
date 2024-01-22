const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

async function verifyData(req, res, next) {
  try {
    const { authToken, refreshToken } = req.cookies;
    console.log(authToken,refreshToken);

    jwt.verify(authToken, process.env.AUTHKEY, (err, data) => {
      if (err || !data) {
        // If authToken is not valid, check refreshToken
        jwt.verify(refreshToken, process.env.REFRESHKEY, (err, data) => {
          if (err || !data) {
            res.status(401).send("Not authorized. Please login again.");
          } else {
            next();
          }
        });
      } else {
        next(); // authToken is valid
      }
    });
  } catch (error) {
    console.error("Authentication error: ", error);
    res.status(401).send("Not authorized");
  }
}

module.exports = verifyData;
