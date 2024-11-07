const express = require('express');
const controller = require('../controllers/questionsController')

const router = express.Router()

router.post('/add', controller.insertQuestion);
router.get('/all', controller.getQuestions);
router.get('/:id', controller.getQuestion);
router.delete('/delete/:id', controller.deleteQuestion);
router.post('/vote/:id', controller.addVoteQuestion);
router.post('/answer/:id', controller.addAnswerQuestion);

module.exports = router;
