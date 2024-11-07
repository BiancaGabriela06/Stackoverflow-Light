const axios = require('axios');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '../helpers'); 
const filePath = path.join(dirPath, 'jwt-token.json')


const signUpController = async (req, res) => {
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
    //res.oidc.login();
    
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
   }

   try {
    const response = await axios.post(`${process.env.DATA_SERVICE_URL}/auth/login`, req.body, {
        headers: { 'Content-Type': 'application/json' },
    });

    const dataToWrite = {token: response.data.token};

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true }); 
      }

    fs.writeFile(filePath, JSON.stringify(dataToWrite, null, 2), (err) => {
    if (err) {
        console.log('Error writing to file', err);
        return res.status(500).json({ message: 'Error writing to file' });
    }
    
    res.status(response.status).send({ data: response.data, token: response.token });
    });

    } catch (error) {
        console.error('Error sending data to data-service:', error);
        res.status(500).send('Error login');
    }
}

const forgotPasswordController = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
     return res.status(400).json({errors: errors.array()});
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    const user = {
        email: req.body.email,
        newPassword: hashedPassword
    }


    try {
     const response = await axios.post(`${process.env.DATA_SERVICE_URL}/auth/forgot-password`, user, {
         headers: { 'Content-Type': 'application/json' },
     });
     res.status(response.status).send(response.data);
     } catch (error) {
         console.error('Error sending data to data-service:', error);
         res.status(500).send('Error change password');
     }
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