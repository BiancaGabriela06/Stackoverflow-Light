const db = require('../database/createDatabase');

const AuthService = {
    findUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email], (err, result) => {
                if (err) {
                   return reject(err);
                }
                resolve(result);
            });
        });
    },
    createUser: (user) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)',
                [user.username, user.email, user.password, user.createdAt],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    }
}

module.exports = AuthService;