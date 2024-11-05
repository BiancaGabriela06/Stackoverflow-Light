const mysql = require('mysql2');

// Load environment variables from the .env file, if applicable
require('dotenv').config();

const db = mysql.createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,   // Use the Docker Compose service name
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

const createUsersTable = `
    Create Table IF not exists users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(100) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       )
`;

db.query(createUsersTable, (err, results) => {
    if (err){
        console.error("Error creating table: ", err);
    } else {
      console.log('Table users created or already exists');
    }
})

module.exports = db;
