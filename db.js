// The code establishes a database connection to a PostgreSQL database using Sequelize, a popular ORM for Node.js. 
// The sequelize variable holds the database connection information, which is configured based on environment variables set in the .env file. 
// Once the connection is established, the sequelize instance is exported for use in other parts of the application.

// Importing the Sequelize object from the sequelize package
const { Sequelize } = require('sequelize');

// Creating a new Sequelize instance with the provided database name, username, and password
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {

    // Providing the database host information
    host: process.env.DATABASE_HOST,

    // Specifying the dialect to use for interacting with the database
    dialect: 'postgres'
});

// Exporting the sequelize instance for use in other parts of the application
module.exports = sequelize;
