const express = require('express');
const controllers = require('../controllers/questions')

const router = express.Router()

router.post('/add', controllers.insertQuestion);
router.get('/all', controllers.getQuestions);
router.get('/:id', controllers.getQuestion);
router.delete('/delete/:id', controllers.deleteQuestion);
router.post('/vote/:id', controllers.addVoteQuestion);
router.post('/answer/:id', controllers.addAnswerQuestion);

module.exports = router;
