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
        console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2));
    } else {
        console.log('DB Connected successfully');
    }
});

module.exports = db;
