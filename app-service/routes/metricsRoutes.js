const express = require('express');
const authorization = require('../middleware/authorization');
const metricsController = require('../controllers/metricsController');
const router = express.Router();

router.get('/popular-day', authorization, metricsController.popularDay);
router.get('/average-votes/:id', authorization, metricsController.averageVotes);
router.get('/average-questions', authorization, metricsController.averageQuestions);
router.get('/average-answers', authorization,  metricsController.averageAnswerPerUser);

module.exports = router;