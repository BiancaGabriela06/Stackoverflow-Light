const db = require('../database/createDatabase');

const QuestionsService = {
    insertQuestion: (question) => {
        console.log(question);
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO questions (user_id, text, created_at) VALUES (?, ?, ?)',
                [question.user_id, question.text, question.created_at],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    },
    getQuestions: () => {
        return new Promise((resolve, reject) => {
            db.query(
                `Select 
                    q.id, 
                    q.user_id, 
                    q.text, 
                    q.created_at, 
                    COUNT(DISTINCT a.id) as answer_count,
                    COUNT(DISTINCT v.id) as vote_count
                 From 
                    questions q 
                LEFT JOIN 
                    answers a ON q.id = a.question_id
                 LEFT JOIN 
                    votes v ON q.id = v.question_id
                 GROUP BY 
                    q.id
                 ORDER BY 
                    answer_count DESC,
                    vote_count DESC
                `, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    },
    getQuestion: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `Select 
                    q.id, 
                    q.user_id, 
                    q.text, 
                    q.created_at, 
                    COUNT(DISTINCT a.id) as answer_count,
                    COUNT(DISTINCT v.id) as vote_count
                From 
                    questions q 
                LEFT JOIN 
                    answers a ON q.id = a.question_id
                 LEFT JOIN 
                    votes v ON q.id = v.question_id
                 WHERE 
                    q.id = ?
                 GROUP BY 
                    q.id
                 ORDER BY 
                    answer_count DESC,
                    vote_count DESC
                `,
                [id],
                (err, result) => {
                    if (err) {
                        console.log(err)
                       // return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    },
    getQuestionAnswers: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                    a.id AS answer_id,
                    a.user_id AS answer_user_id,
                    a.text AS answer_text,
                    a.created_at AS answer_created_at
                 FROM 
                    answers a
                 WHERE 
                    a.question_id = ?`,
                [id],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results); 
                }
            );
        });
    },
    deleteQuestion: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'Delete from questions where id = ?', [id], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    },
    voteQuestion: (vote) => {
        return new Promise((resolve, reject) => {
            db.query(
                'Insert into votes (user_id, question_id, type_vote, created_at) VALUES (?,?,?,?)', 
                [vote.user_id, vote.question_id, vote.type, vote.createdAt], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    },
    answerQuestion: (answer) => {
        return new Promise((resolve, reject) => {
            db.query(
                'Insert into answers (user_id, question_id, text, created_at) VALUES (?,?,?,?)', 
                [answer.user_id, answer.question_id, answer.text, answer.createdAt], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    }
};

module.exports = QuestionsService;