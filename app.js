require("dotenv").config();
const Express = require("express");
const dbConnection = require('./db');
const app = Express();

const middleware = require('./middleware')

// This method is used to parse the incoming requests with JSON payloads and is based upon the bodyparser. This method returns the middleware that only parses JSON and only looks at the requests where the content-type header matches the type option.
app.use(Express.json())
app.use(require("./middleware/headers"))

// Import the controllers as a bundle through the object that we just exported in the index.js and store it in a variable called controllers allowing us to access each controller by using dot notation
const controllers = require("./controllers")

// Call app.use and in the first parameter create a base URL for each controller for example the todo controllers URL will look like http://localhost:3000/todo
app.use("/", controllers.usercontroller)

app.use("/todo", controllers.todocontroller)
app.use("/category", controllers.todocategorycontroller)

app.use(middleware.validateSession)


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