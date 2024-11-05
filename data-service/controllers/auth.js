const moment = require('moment');
const db = require('../database');
const bcrypt = require('bcryptjs')

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

const loginController = async (req, res) => {
    try {
        db.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [req.body.email], async (err, data) => {
            if(err) {
                console.log(err);
                return res.status(500).json({ message: 'Internal server error' });
            } 
            if(data.length === 0) {
                console.log("User not found");
                return res.status(404).json({ Status: "Error", Error: "Wrong email or password." });

            }
            
            const isPasswordCorrect = await bcrypt.compare(
                req.body.password, 
                data[0].password
            );
    
            if(!isPasswordCorrect){
              console.log("Wrong password!")
              return res.status(401).json({ Status: "Error", Error: "Wrong email or password." });
            } 

            return res.status(200).json({message: "Success", data: data[0].username})

        }) 
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const forgotPasswordController = async (req, res) => {
    try{
        db.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [req.body.email], async (err, data) => {
            if(err) {
                console.log(err);
                return res.status(500).json({ message: 'Internal server error' });
            } 
            if(data.length === 0) {
                console.log("User not found");
                return res.status(404).json({ Status: "Error", Error: "Wrong email or password." });

            }
            db.query( 'UPDATE users SET password = ? WHERE LOWER(email) = LOWER(?)',
                [req.body.newPassword, req.body.email], (err, result) => {
                  if(err){
                    console.log(err);
                    return res.json(err);
                  } else {
                    res.status(200).json({
                        message: 'Password updated succesfully!',
                    });
                  }
                })  

        }) 
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    signUpController,
    loginController,
    forgotPasswordController
};
