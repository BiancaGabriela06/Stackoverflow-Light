const axios = require('axios');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


const signUpController = async (req, res) => {
    console.log("auth-service ", req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
       return res.status(400).json({errors: errors.array()});
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = {
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }

    try {
        const response = await axios.post(`${process.env.DATA_SERVICE_URL}/auth/sign-up`, user, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error sending data to data-service:', error);
        res.status(500).send('Error saving data to database');
    }
};

const loginController = async (req, res) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
   }

   try {
    const response = await axios.post(`${process.env.DATA_SERVICE_URL}/auth/login`, req.body, {
        headers: { 'Content-Type': 'application/json' },
    });
    res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error sending data to data-service:', error);
        res.status(500).send('Error login');
    }
 
}

const forgotPasswordController = (req, res) => {
    console.log("signUpController")
}

const deleteAccountController = (req, res) => {
    console.log("deleteAccountController")
}

module.exports = {
    signUpController,
    loginController,
    forgotPasswordController,
    deleteAccountController,
};