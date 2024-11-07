const express = require('express');
const controllers = require('../controllers/authController')

const router = express.Router()

router.post('/sign-up', controllers.signUpController);
router.post('/login', controllers.loginController);
router.post('/forgot-password', controllers.forgotPasswordController);

module.exports = router;

