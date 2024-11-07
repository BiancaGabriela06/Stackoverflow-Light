const axios = require('axios');

const getQuestions = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.DATA_SERVICE_URL}/questions/all`, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error get questions to data-service:', error);
        res.status(500).send('Error saving data to database');
    }
}

const getQuestion = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.DATA_SERVICE_URL}/questions/${req.params.id}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error get questions to data-service:', error);
        res.status(500).send('Error saving data to database');
    }
}

const insertQuestion = async (req, res) => {
    try {
        const response = await axios.post(`${process.env.DATA_SERVICE_URL}/questions/add`, req.body, {
            headers: { 'Content-Type': 'application/json' },
        });

        res.status(response.status).send(response.message);
    } catch (error) {
        console.error('Error message:', error);
        console.error('Error sending data to data-service:', error.toJSON());
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
        console.error('Error sending data to data-service:', error);
        res.status(500).send('Error saving data to database');
    }
}

const voteQuestion = async (req, res) => {
    try {
        const response = await axios.post(`${process.env.DATA_SERVICE_URL}/questions/vote/${req.params.id}`,  req.body, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error sending data to data-service:', error);
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
        console.error('Error sending data to data-service:', error);
        res.status(500).send('Error saving data to database');
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