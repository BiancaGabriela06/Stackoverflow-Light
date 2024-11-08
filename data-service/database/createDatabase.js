const mysql = require('mysql2');
const {createUsersTable, createQuestionsTable, createAnswersTable, createVotesTable} = require('./tables');

require('dotenv').config();

///Connecting to the database and creating if it's mandatory the tables 

const db = mysql.createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,   
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

db.connect((err) => {
    if (err) {
        console.log( JSON.stringify(err, undefined, 2));
    } else {
        console.log('DB Connected successfully');
    }
});


db.query(createUsersTable, (err, results) => {
    if (err){
        console.error("Error creating users table: ", err);
    } else {
      console.log('Table users created or already exists');
    }
});

db.query(createQuestionsTable, (err, results) => {
    if (err){
        console.error("Error creating questions table: ", err);
    } else {
      console.log('Table questions created or already exists');
    }
});

db.query(createAnswersTable, (err, results) => {
    if (err){
        console.error("Error creating answers table: ", err);
    } else {
      console.log('Table answers created or already exists');
    }
});

db.query(createVotesTable, (err, results) => {
    if (err){
        console.error("Error creating votes table: ", err);
    } else {
      console.log('Table votes created or already exists');
    }
})

module.exports = db;
