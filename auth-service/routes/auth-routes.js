const express = require('express');
const controllers = require('../controllers/auth-controllers')
const { signUpValidation, loginValidation, forgotPasswordValidation } = require('../helpers/auth-validation');
const router = express.Router()

router.post('/sign-up', signUpValidation, controllers.signUpController);
router.post('/login', loginValidation, controllers.loginController);
router.post('/forgot-password',forgotPasswordValidation, controllers.forgotPasswordController);
router.post('/delete-account', controllers.deleteAccountController);

module.exports = router;

