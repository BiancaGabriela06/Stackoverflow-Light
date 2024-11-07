const express = require('express');
const authenticate = require('../middleware/authenticate');
const questionsController = require('../controllers/questions');
const router = express.Router();

router.get('/all', authenticate, questionsController.getQuestions);
router.get('/:id', authenticate, questionsController.getQuestion);
router.post('/add', authenticate, questionsController.insertQuestion);
router.delete('/delete/:id', authenticate,  questionsController.deleteQuestion);
router.post('/vote/:id', authenticate, questionsController.voteQuestion);
router.post('/answer/:id', authenticate, questionsController.answerQuestion);

module.exports = router;