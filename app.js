require("dotenv").config();
const Express = require("express");
const dbConnection = require('./db');
const app = Express();





dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(`[Server]: server crashed. Error = ${err}`)
    })