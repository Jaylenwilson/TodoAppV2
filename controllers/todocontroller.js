// Users can manage a task list with endpoints for create, delete, update, and read an Task

// Import the Express framework and store it inside the variable . This instance becomes our gateway to using Express methods.
const Express = require('express')
// Create a new variable called router Since the  variable gives us access into the express framework, we can access express properties and methods by calling . Therefore, when we call , we are using the  variable to access the 
//  method.
const router = Express.Router()
// Import the models object in order to create new instances of the Todo model
const { models } = require('../models');
// Import validateJWT to make sure a user is logged in before making any request
const validateJWT = require('../middleware/validate-session.js');

router.post('/createtodo', validateJWT, async (req, res) => {
    const { title, description, priority } = req.body.todo

    try {
        await models.TodoModel.create({
            title: title,
            description: description,
            priority: priority
        })
            .then(
                todo => {
                    res.status(200).send({
                        todo: todo,
                        message: `${todo.title} has been created`
                    })
                }
            )
    } catch (err) {

        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
            })
        }
        else {
            res.status(500).json({
                message: `Sorry we could not create your todo ${err}`
            });
        };
    }
})

router.get('/all/:userId', validateJWT, async (req, res) => {
    const userId = req.params.userId
    try {
        const todos = await models.TodoModel.findAll({
            where: {
                userId: userId
            }

        })
        // TODO: sort todos by priority below

    } catch (err) {

        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
            })
        }
        else {
            res.status(500).json({
                msg: `Sorry we could not find your todo's ${err}`
            });
        };
    }
})


module.exports = router