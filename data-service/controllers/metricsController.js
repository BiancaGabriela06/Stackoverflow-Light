const MetricsService = require('../services/metricsService');

///Using MetricsService that provides the necessary queries

const popularDay = async (req, res) => {
    try {
        const result = await MetricsService.getPopularDayOfWeek();
        console.log(result);

        if (result.length > 0) {
            res.status(200).json({
                popularDay: result[0].day_of_week,
                activityCount: result[0].total_activity
            });
        } else {
            res.status(200).json({
                message: "No activity data available for the current week."
            });
        }
    } catch (error) {
        console.error("Error fetching popular day:", error);
        res.status(500).json({ message: "Server error." });
    }
};

const averageVotesPerQuestion = async (req, res) => {
    const questionId = req.params.id;
    
    try {
       const rows = await MetricsService.getAverageVotesPerQuestion(questionId);

        if (rows.length > 0 && rows[0].avg_vote_for_question !== null) {
            res.status(200).json({
                questionId,
                averageVote: rows[0].avg_vote_for_question
            });
        } else {
            res.status(200).json({
                message: "No votes available for this question to calculate the average."
            });
        }
    } catch (error) {
        console.error("Error calculating average votes for question:", error);
        res.status(500).json({ message: "Server error." });
    }
};

const averageQuestionsPerDay = async (req, res) => {
    try {
        const rows = await MetricsService.getAverageQuestionsPerDay();

        if (rows.length > 0 && rows[0].avg_questions_per_day !== null) {
            res.status(200).json({
                averageQuestionsPerDay: rows[0].avg_questions_per_day
            });
        } else {
            res.status(200).json({
                message: "No questions available to calculate the average."
            });
        }
    } catch (error) {
        console.error("Error calculating average questions per day:", error);
        res.status(500).json({ message: "Server error." });
    }
};

const averageAnswerPerUser = async (req, res) => {
    try {
        const rows = await MetricsService.getAverageAnswersPerUser();

        if (rows.length > 0 && rows[0].avg_answers_per_user !== null) {
            res.status(200).json({
                averageAnswersPerUser: rows[0].avg_answers_per_user
            });
        } else {
            res.status(200).json({
                message: "No answers available to calculate the average."
            });
        }
    } catch (error) {
        console.error("Error calculating average answers per user:", error);
        res.status(500).json({ message: "Server error." });
    }
};

module.exports = {
    popularDay,
    averageVotesPerQuestion,
    averageQuestionsPerDay,
    averageAnswerPerUser
}