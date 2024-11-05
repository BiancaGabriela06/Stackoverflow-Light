const { body } = require('express-validator');

const signUpValidation = [
    body('email').isEmail().withMessage('Must be a valid email'),
    body('name').notEmpty().isLength({ min: 6 }).withMessage('Username must have at least 6 characters'),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[0-9!@#$%^&*()_+]/).withMessage('Password must contain at least one number or special character'),
    body('repeatPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
];

const loginValidation = [
    body('email').notEmpty().isEmail().withMessage('Must be a valid email'),
    body('password').notEmpty()
]

module.exports = {
    signUpValidation,
    loginValidation
}