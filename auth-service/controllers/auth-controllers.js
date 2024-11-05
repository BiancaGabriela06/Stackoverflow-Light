const express = require('express');
const axios = require('axios');

const signUpController = async (req, res) => {
    console.log("signUpController")
    console.log(req.body);
    try {
        //const response = await axios.post('http://data-service:8000/sign-up', req.body);
        console.log('?');
        console.log("something");
        //res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error sending data to data-servoce:', error);
       // res.status(500).send('Error saving data to database');
    }
};

const loginController = (req, res) => {
    console.log("loginController")
   
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