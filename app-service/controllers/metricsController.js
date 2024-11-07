const axios = require('axios');

const popularDay = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.DATA_SERVICE_URL}/metrics/popular-day`, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error get popular day of the week:', error);
        res.status(500).send('Error getting popular day of the week from database');
    }
}

const averageVotes = async (req, res) => {
        try {
            const response = await axios.get(`${process.env.DATA_SERVICE_URL}/metrics/average-votes/${id}`, {
                headers: { 'Content-Type': 'application/json' },
            });
            res.status(response.status).send(response.data);
        } catch (error) {
            console.error('Error get average-votes per question with given id: ', error);
            res.status(500).send('Error getting average-votes per question with given id from database');
        }
}

const averageQuestions = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.DATA_SERVICE_URL}/metrics/average-questions`, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error average questions per day:', error);
        res.status(500).send('Error getting average questions per day from database');
    }
}

const averageAnswerPerUser = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.DATA_SERVICE_URL}/metrics/average-answers`, {
            headers: { 'Content-Type': 'application/json' },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error average answers per user:', error);
        res.status(500).send('Error average answers per user from database');
    }
}

module.exports = {
    popularDay,
    averageVotes,
    averageQuestions,
    averageAnswerPerUser
}