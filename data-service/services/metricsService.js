const db = require('../database/createDatabase');

const MetricsService = {
    getPopularDayOfWeek: async () => {
        return new Promise((resolve, reject) => {
            db.query( `
                SELECT 
                    DAYNAME(created_at) AS day_of_week,
                    COUNT(*) AS total_activity
                FROM (
                    SELECT created_at FROM questions WHERE YEARWEEK(created_at, 1) = YEARWEEK(NOW(), 1)
                    UNION ALL
                    SELECT created_at FROM answers WHERE YEARWEEK(created_at, 1) = YEARWEEK(NOW(), 1)
                    UNION ALL
                    SELECT created_at FROM votes WHERE YEARWEEK(created_at, 1) = YEARWEEK(NOW(), 1)
                ) AS weekly_activity
                GROUP BY day_of_week
                ORDER BY total_activity DESC
                LIMIT 1;
            `, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }
            )
    })
    },
    
    getAverageVotesPerQuestion: async (questionId) => {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                    AVG(type_vote) AS avg_vote_for_question
                FROM votes
                WHERE question_id = ?
            `, [questionId], (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(result);
                    })
        })
        
    },

    getAverageQuestionsPerDay: async () => {
        return new Promise((resolve, reject) => {
            db.query( `SELECT 
                        COUNT(*) / NULLIF(COUNT(DISTINCT DATE(created_at)), 0) AS avg_questions_per_day
                        FROM questions;
                `, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(result);
                    })
        })
        
    },

    getAverageAnswersPerUser: async () => {
        return new Promise((resolve, reject) => {
            db.query( `SELECT 
                        COUNT(*) / NULLIF(COUNT(DISTINCT user_id), 0) AS avg_answers_per_user
                    FROM answers;
                ` , (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(result);
                    })
        })
    },

    getAverageVotesForQuestion: async () =>  {
        return new Promise((resolve, reject) => {
            db.query(`
                SELECT 
                    AVG(type_vote) AS avg_vote_for_question
                FROM votes
                WHERE question_id = ?
            ` , (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                })
        })
      
    }
}


module.exports = MetricsService;
