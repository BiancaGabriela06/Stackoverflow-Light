const express = require('express');
const controllers = require('../controllers/auth')

const router = express.Router()

router.post('/sign-up', controllers.signUpController);

module.exports = router;

