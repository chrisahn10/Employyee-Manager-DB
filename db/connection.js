const mysql = require("mysql2");
require("dotenv").config();

// Establish a connection to the database using environment variables for security
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database and handle any connection errors
connection.connect((err) => {
    if (err) {
        console.error(`Error connecting to the database: ${err.stack}`);
        return;
    }
    console.log(`Successfully connected to the database as id ${connection.threadId}`);
});

// Export the connection for use in other modules
module.exports = connection;
