const express = require('express');

const signUpController = (req, res) => {
    console.log("signUpController")
}

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