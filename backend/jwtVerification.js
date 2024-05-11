const dotenv = require("dotenv");

// JWT Verify middleware
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, 
        process.env.ACCESS_TOKEN_SECRET,
        (err, payload) => {
          if(err) {
            return res.status(403).json("Token is not valid");
          }
          req.user = payload.user;
          next();
        }
      )
    }
};

const generateAccessToken = (payload) => {
    console.log('I have entered in token', payload);
    return jwt.sign( payload , process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "180s",
    });
};
  
const generateRefreshToken = (payload) => {
    return jwt.sign({ data: payload }, process.env.ACCESS_TOKEN_REFRESH);
};

module.exports = { verify, generateAccessToken, generateRefreshToken };
  