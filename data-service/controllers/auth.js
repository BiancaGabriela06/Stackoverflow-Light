const express = require('express');

const signUpController = async (req, res) => {
    console.log("data-service ", req.body);
};

module.exports = {
    signUpController
};