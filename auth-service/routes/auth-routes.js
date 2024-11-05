const express = require('express');
const controllers = require('../controllers/auth-controllers')

const router = express.Router()

router.post('/sign-up', controllers.signUpController);
router.get('/login', controllers.loginController);
router.post('/forgot-password', controllers.forgotPasswordController);
router.post('/delete-account', controllers.deleteAccountController);

module.exports = router;

