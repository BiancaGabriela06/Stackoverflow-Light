const express = require('express');
const controllers = require('../controllers/auth')

const router = express.Router()

router.post('/sign-up', controllers.signUpController);
router.post('/login', controllers.loginController);

module.exports = router;

