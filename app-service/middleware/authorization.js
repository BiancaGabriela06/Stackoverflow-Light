const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const cleanToken = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;
  
  jwt.verify(cleanToken, process.env.JWT_SECRET, (err, decoded) => {
    // if (err) {
    //   return res.status(401).json({ message: 'Failed to authenticate token' });
    // }

    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
