const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  console.log("Token from request:", token);

  const cleanToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

 // console.log("Looking for token file at:", filePath);

  // if (fs.existsSync(filePath)) {
  //   const storedToken = JSON.parse(fs.readFileSync(filePath, 'utf8')).token;
  //   console.log("Stored token:", storedToken);
    
  //   if (cleanToken !== storedToken) {
  //     return res.status(401).json({ message: 'Token does not match the stored token' });
  //   }
  // } else {
  //   console.log("Token file does not exist at the expected path.");
  //   return res.status(500).json({ message: 'Token storage file missing on server' });
  // }

  jwt.verify(cleanToken, process.env.JWT_SECRET, (err, decoded) => {
    // if (err) {
    //   return res.status(401).json({ message: 'Failed to authenticate token' });
    // }

    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
