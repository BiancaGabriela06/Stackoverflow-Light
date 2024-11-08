const moment = require('moment');
const QuestionsService = require('../services/questionsService');

///Using QuestionService that provides the necessary queries

const insertQuestion = async (req, res) => {
   try {
        const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        const question = {
            user_id: req.body.user_id,
            text: req.body.text,
            created_at: createdAt
        }

        await QuestionsService.insertQuestion(question);

        res.status(201).json({
            message: 'Question added successfully!',
        });

   } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
   }
};

const getQuestions = async (req, res) => {
    try {
        const questions = await QuestionsService.getQuestions();
        res.status(200).json({
            message: 'Success',
            data: questions
       });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getQuestion = async (req, res) => {
    try {
        const questionData = await QuestionsService.getQuestion(req.params.id);
        const questionAnswers = await QuestionsService.getQuestionAnswers(req.params.id);
        res.status(200).json({
            message: 'Success',
            questionData: questionData,
            answers: questionAnswers
       });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const question = await QuestionsService.deleteQuestion(req.params.id);
        res.status(200).json({
            message: 'Success',
            data: question
       });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addVoteQuestion = async (req, res) => {
    try {

        const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        const vote = {
            question_id: req.params.id,
            type: req.body.type_vote,
            user_id: req.body.user_id,
            createdAt: createdAt
        }

        await QuestionsService.voteQuestion(vote);
        res.status(200).json({ message: 'Success'});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addAnswerQuestion = async (req, res) => {
    try {
        const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        const answer = {
            question_id: req.params.id,
            text: req.body.text,
            user_id: req.body.user_id,
            createdAt: createdAt
        }

        await QuestionsService.answerQuestion(answer);
        res.status(200).json({ message: 'Success'});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    insertQuestion,
    getQuestions,
    getQuestion,
    deleteQuestion,
    addVoteQuestion,
    addAnswerQuestion
}