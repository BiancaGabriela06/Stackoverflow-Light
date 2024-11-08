const axios = require('axios');

//Data is sent to the data-service that manage database
const getQuestions = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.DATA_SERVICE_URL}/questions/all`, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send('Error getting questions from database');
    }
}

const getQuestion = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.DATA_SERVICE_URL}/questions/${req.params.id}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send('Error getting question with given id from database');
    }
}

const insertQuestion = async (req, res) => {
    try {
        const response = await axios.post(`${process.env.DATA_SERVICE_URL}/questions/add`, req.body, {
            headers: { 'Content-Type': 'application/json' },
        });

        res.status(response.status).send(response.message);
    } catch (error) {
        res.status(500).send('Error saving data to database ');
    }
}

const deleteQuestion = async (req, res) => {
    try {
        const response = await axios.delete(`${process.env.DATA_SERVICE_URL}/questions/delete/${req.params.id}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send('Error deleting data from database');
    }
}

const voteQuestion = async (req, res) => {
    try {
        const response = await axios.post(`${process.env.DATA_SERVICE_URL}/questions/vote/${req.params.id}`,  req.body, {
            headers: { 
                'Content-Type': 'application/json',
             },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send('Error saving data to database');
    }
}

const answerQuestion = async (req, res) => {
    try {
        const response = await axios.post(`${process.env.DATA_SERVICE_URL}/questions/answer/${req.params.id}`,  req.body, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(500).send('Error getting answers for the question with given id from database');
    }
}

module.exports = {
    getQuestions,
    getQuestion,
    insertQuestion,
    deleteQuestion,
    voteQuestion,
    answerQuestion
};