const moment = require('moment');
const db = require('../database');

const signUpController = async (req, res) => {
    try {
        // Check if the user already exists
        db.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [req.body.email], (err, result) => {
            if(err) {
                console.log(err);
                return res.json(err);
            } 
        })

        const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        db.query('INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)',
            [req.body.username, req.body.email, req.body.password, createdAt], (err, result) => {
              if(err){
                console.log(err);
                return res.json(err);
              } else {
                res.status(201).json({
                    message: 'User registered successfully!',
                });
              }
            })    
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    signUpController
};
