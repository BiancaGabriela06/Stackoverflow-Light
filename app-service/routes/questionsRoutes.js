const express = require('express');
const authorization = require('../middleware/authorization');
const questionsController = require('../controllers/questionsController');
const router = express.Router();

router.get('/all', authorization, questionsController.getQuestions);
router.get('/:id', authorization, questionsController.getQuestion);
router.post('/add', authorization, questionsController.insertQuestion);
router.delete('/delete/:id', authorization,  questionsController.deleteQuestion);
router.post('/vote/:id', authorization, questionsController.voteQuestion);
router.post('/answer/:id', authorization, questionsController.answerQuestion);

module.exports = router;