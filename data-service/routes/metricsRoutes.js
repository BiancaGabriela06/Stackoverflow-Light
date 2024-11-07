const express = require('express');
const metricsController = require('../controllers/metricsController')

const router = express.Router()

router.get('/popular-day', metricsController.popularDay);
router.get('/average-votes/:id', metricsController.averageVotes);
router.get('average-questions', metricsController.averageQuestions);
router.get('/average-answers', metricsController.averageAnswerPerUser);

module.exports = router;
