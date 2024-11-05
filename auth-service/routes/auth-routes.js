const express = require('express');
const controllers = require('../controllers/auth-controllers')
const { signUpValidation } = require('../helpers/auth-validation');
const router = express.Router()

router.post('/sign-up', signUpValidation, controllers.signUpController);
router.post('/login', controllers.loginController);
router.post('/forgot-password', controllers.forgotPasswordController);
router.post('/delete-account', controllers.deleteAccountController);

module.exports = router;

