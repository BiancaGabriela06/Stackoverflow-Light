const axios = require('axios');

const getQuestions = async (req, res) => {
    ///nu uita sa le ordonezi in functie de popularitate
    console.log("get-questions")
}

const getQuestion = async (req, res) => {
    console.log("get-one-question");
}
const insertQuestion = async (req, res) => {
    console.log("insert question")
}

const deleteQuestion = async (req, res) => {
    console.log("delete question");
}

const voteQuestion = async (req, res) => {
    console.log("upvote question");
}

const answerQuestion = async (req, res) => {
    console.log("answer question")
}

module.exports = {
    getQuestions,
    getQuestion,
    insertQuestion,
    deleteQuestion,
    voteQuestion,
    answerQuestion
};