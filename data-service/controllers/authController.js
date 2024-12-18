const moment = require('moment');
const db = require('../database/createDatabase');
const bcrypt = require('bcryptjs');
const AuthService = require('../services/authService');
const jwt = require('jsonwebtoken');
const fs = require('fs');

///Using AuthService that provides the necessary queries

const signUpController = async (req, res) => {
    try {
        const userExists = await AuthService.findUserByEmail(req.body.email);
        
        if (userExists.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            createdAt: createdAt
        }
        await AuthService.createUser(user);

        res.status(201).json({
            message: 'User registered successfully!',
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginController = async (req, res) => {
    try {
        const userData = await AuthService.findUserByEmail(req.body.email);

        if(userData.length === 0) {
            return res.status(404).json({ Status: "Error", Error: "Wrong email or password." });
        }
        
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, 
             userData[0].password
        );

        if(!isPasswordCorrect){
            return res.status(401).json({ Status: "Error", Error: "Wrong email or password." });
        } 

        const token = jwt.sign(req.body, process.env.JWT_SECRET, {expiresIn: '2h' });
        return res.status(200).json({message: "Success", data: userData[0].username, token: token})
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const forgotPasswordController = async (req, res) => {
    try{
        const userData = await AuthService.findUserByEmail(req.body.email);
        if(userData.length === 0) {
            return res.status(404).json({ Status: "Error", Error: "Wrong email or password." });
        }

        db.query( 'UPDATE users SET password = ? WHERE LOWER(email) = LOWER(?)',
            [req.body.newPassword, req.body.email], (err, result) => {
                if(err){
                    return res.json(err);
                } else {
                  res.status(200).json({ message: 'Password updated succesfully!'});
                }
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
