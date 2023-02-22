// Required modules
const Express = require('express');
const router = Express.Router();
const { models } = require('../models');
const validateJWT = require('../middleware/validate-session.js');

// Create a new project
router.post('/projectcreate', validateJWT, async (req, res) => {
    const { projectName } = req.body.project

    try {
        await models.ProjectModel.create({
            projectName: projectName,
            userId: req.user.id
        })
            .then(
                project => {
                    res.status(200).send({
                        project: project,
                        msg: `${projectName} has been created`
                    })
                }
            )
    } catch (err) {
        // Handle validation errors
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
            })
        }
        else {
            // Handle all other errors
            res.status(500).json({
                message: `Sorry we could not create your project ${err}`
            });
        };
    }
})

// Get all projects for a user
router.get('/allprojects/:userId', validateJWT, async (req, res) => {
    const userId = req.params.userId;
    try {
        await models.ProjectModel.findAll({
            where: {
                userId: userId
            },
            include: [
                {
                    model: models.TodoModel
                }
            ]
        }).then(
            projects => {
                res.status(200).send({
                    projects: projects,
                    msg: 'your projects have been received'
                })
            }
        )
    } catch (err) {
        res.status(500).json({
            msg: `Sorry we could not find your project ${err}`
        });
    };
})

// Delete a project by ID
router.delete('/deleteproject/:id', validateJWT, async (req, res) => {
    const id = req.params.id

    const projectName = req.body.project
    try {
        await models.ProjectModel.destroy({
            where: {
                id: id
            }
        })

        res.status(200).send({
            msg: `${projectName} has been deleted`
        })
    } catch (err) {
        res.status(500).send({
            msg: `Could not delete ${projectName}`
        })
    }
})

// Update a project by ID
router.put('/editproject/:id', validateJWT, async (req, res) => {
    const { projectName } = req.body.project

    const id = req.params.id

    try {

        const editedProject = await models.ProjectModel.update({
            projectName: projectName
        },
            {
                where: {
                    id: id
                }
            }
        )

        res.status(200).send({
            editedProject: editedProject,
            msg: `${projectName} has been edited`
        })

    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
            })
        } else {
            res.status(500).json({
                message: `Sorry we could not update your project ${err}`
            });
        };
    }
})

// Export the router
module.exports = router
