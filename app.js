// This code reads the .env file and loads it into the environment variables
require("dotenv").config();

// Import the express module and create an instance of the express app
const Express = require("express");
// Import the db connection module
const dbConnection = require('./db');
const app = Express();


// Import the middleware module
const middleware = require('./middleware')

// This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser. This method returns the middleware that only parses JSON and only looks at the requests where the content-type header matches the type option.
// We use it to parse incoming request bodies that are in JSON format.
app.use(Express.json())

// Add the headers middleware to the middleware chain
app.use(require("./middleware/headers"))

// Import the controllers as a bundle through the object that we just exported in the index.js and store it in a variable called controllers allowing us to access each controller by using dot notation
const controllers = require("./controllers");
const { sequelize } = require("./models/user");

// Call app.use and in the first parameter create a base URL for each controller for example the todo controllers URL will look like http://localhost:3000/todo
// This sets up the routes for our controllers.

app.use("/", controllers.usercontroller)
app.use("/todo", controllers.todocontroller)
app.use("/project", controllers.projectcontroller)

// This is a custom middleware function that validates user sessions.
app.use(middleware.validateSession)

// Authenticate the database connection and synchronize the models. Start listening for requests on the specified port.
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


// dbConnection.authenticate()
//     .then(() => dbConnection.sync({ force: true }))
//     .then(() => {
//         app.listen(process.env.PORT, () => {
//             console.log(`[Server]: App is listening on ${process.env.PORT}`);
//         })
//     })
//     .catch((err) => {
//         console.log(`[Server]: server crashed. Error = ${err}`)
//     })
