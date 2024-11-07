const express = require('express');
const questionsController = require('../controllers/questions');
const router = express.Router();

router.get('/all', questionsController.getQuestions);
router.get('/:id', questionsController.getQuestion);
router.post('/add', questionsController.insertQuestion);
router.delete('/delete/:id', questionsController.deleteQuestion);
router.post('/vote/:id', questionsController.voteQuestion);
router.post('/answer/:id', questionsController.answerQuestion);

module.exports = router;