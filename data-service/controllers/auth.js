const express = require('express');

const signUpController = async (req, res) => {
    console.log("signUpController")
    console.log(req.body);
};

module.exports = {
    signUpController
};