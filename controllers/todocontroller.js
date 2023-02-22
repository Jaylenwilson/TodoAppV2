// This code imports the necessary packages and dependencies for the application to run. Express is imported and an instance of the Express framework 
// is created and stored in the router variable. models are imported to create new instances of the Todo model. validateJWT is imported to make 
// sure a user is authenticated before making any request.
const Express = require('express');
const router = Express.Router();
const { models } = require('../models');
const validateJWT = require('../middleware/validate-session.js');
// END ////////////////////////////////////////////////////////////////////////



// This code creates a new task in the TodoModel by making a POST request to the /createtodo endpoint. The validateJWT function is called to make sure 
// the user is authenticated before creating a new task. If the task is created successfully, the server responds with a 200 status and sends a response 
// with the newly created todo and a success message. If there is an error, the server returns a 400 status if the error is a validation 
// error or a 500 status if it is any other type of error.
// HTTP POST request to create a new todo
router.post('/createtodo', validateJWT, async (req, res) => {
    // extract todo properties from request body
    const { title, description, priority, completed, dueDate, projectId } = req.body.todo

    try {
        // create new todo record in the database
        await models.TodoModel.create({
            title: title,
            description: description,
            priority: priority,
            completed: completed,
            dueDate: dueDate ? new Date(dueDate).toISOString() : null,
            projectId: projectId,
            userId: req.user.id
        })
            .then(
                todo => {
                    // send success response with newly created todo
                    res.status(200).send({
                        todo: todo,
                        message: `${todo.title} has been created`
                    })
                }
            )
    } catch (err) {
        // handle validation errors
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
            })
        }
        else {
            // handle all other errors
            res.status(500).json({
                message: `Sorry we could not create your todo ${err}`
            });
        };
    }
})

// END //////////////////////////////////////////////////////////////////////////


// This endpoint retrieves all Todos for a given user ID. It expects a GET request to the route /all/:userId, where userId is the ID of the user 
// whose Todos are being retrieved. It also uses the validateJWT middleware to ensure the user is authenticated before retrieving the Todos.
// The function finds all Todos associated with the specified user ID in the database and sorts them in ascending order by priority. 
// If the Todos are retrieved successfully, it sends a response with the list of Todos and a success message. If there is a validation error, 
// it returns a response with a 400 status code and an array of error messages. If there is an error with the server, it returns a 500 status code 
// and a message explaining that the Todos could not be retrieved.
router.get('/all/:userId', validateJWT, async (req, res) => {
    const userId = req.params.userId; // extract userId from the URL parameter
    try {
        const todos = await models.TodoModel.findAll({ // find all todos that belong to the user
            where: {
                userId: userId
            },
            order: [['priority', 'ASC']], // sort the todos in ascending order of priority
        }).then(
            todos => {
                res.status(200).send({ // send the todos and a success message if the promise resolves
                    todos: todos,
                    msg: 'your todos have been accessed sucessfully '
                })
            }
        )
    } catch (err) {
        if (err.name === 'SequelizeValidationError') { // if there's a validation error, return a 400 response with the error message
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
            })
        }
        else { // if there's any other error, return a 500 response with an error message
            res.status(500).json({
                msg: `Sorry we could not find your todo's ${err}`
            });
        };
    }
})

// END //////////////////////////////////////////////////////////////////////

// This creates a new endpoint that handles HTTP DELETE requests to complete a todo with a specific ID
router.delete('/complete/:id', validateJWT, async (req, res) => {
    // Get the ID from the request URL parameter
    const id = req.params.id;
    // Get the todo title from the request body
    const title = req.body.todo
    try {
        // Use the TodoModel to delete the todo with the specified ID from the database
        await models.TodoModel.destroy({
            where: {
                id: id
            }
        })
        // If the deletion is successful, return a success status code and message
        res.status(200).send({
            msg: `${title} completed`
        })
    } catch (err) {
        // If there is an error with the deletion, return an error status code and message
        res.status(500).send({
            msg: `Could not complete ${title}`
        })
    }
})


// his route handles updating a task with the specified id by using the HTTP PUT verb. 
// It extracts the new task details from the request body and the id from the request parameters. 
// It then attempts to update the task using the Sequelize update() method. If the update is successful, 
// it sends a success response with the edited task and a success message. If the update fails, 
// it handles the error by sending an appropriate response.
// This route handles updating a task with the specified id. It uses the put() method which maps to HTTP PUT verb.
router.put('/edit/:id', validateJWT, async (req, res) => {

    // Destructure the request body to get the new task details (title, description and priority) from req.body.todo.
    const { title, description, priority } = req.body.todo

    // Get the id from the request params to identify the task to be updated.
    const id = rq.params.id

    try {
        // Update the task with the given id using the Sequelize update() method. 
        const editedTodo = await models.TodoModel.update({
            title: title,
            description: description,
            priority: priority
        },
            {
                where: {
                    id: id
                }
            })

        // If the update is successful, send a success response with the edited task and a success message.
        res.status(200).send({
            msg: `${editedTodo.title} edited successfully`,
            editedTodo: editedTodo
        })

    } catch (err) {

        // If the update fails, handle the error.
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
            })
        } else {
            res.status(500).json({
                message: `Sorry post your product ${err}`
            });
        };
    }
})



module.exports = router