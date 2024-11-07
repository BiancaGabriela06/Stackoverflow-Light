const express = require('express');
const authenticate = require('../middleware/authenticate');
const metricsController = require('../controllers/metricsController');
const router = express.Router();

router.get('/popular-day', authenticate, metricsController.popularDay);
router.get('/average-votes/:id', authenticate, metricsController.averageVotes);
router.get('average-questions', authenticate, metricsController.averageQuestions);
router.get('/average-answers', authenticate,  metricsController.averageAnswerPerUser);

module.exports = router;