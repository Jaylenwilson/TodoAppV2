// User can create, delete, and update a todo category where todos can be stored
const Express = require('express');
const router = Express.Router();
const { models } = require('../models');
const validateJWT = require('../middleware/validate-session.js');

router.post('/projectcreate', validateJWT, async (req, res) => {
    const { projectName } = req.body.project

    try {
        await models.ProjectModel.create({
            projectName: projectName
        })
            .then(
                project => {
                    res.status(200).send({
                        project: project,
                        msg: `${project} has been created`
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
                message: `Sorry we could not create your project ${err}`
            });
        };
    }
})

router.get('/allprojects/:userId', validateJWT, async (req, res) => {
    const userId = req.params.userId;
    try {
        await models.ProjectModel.findAll({
            where: {
                userId: userId
            }
        }).then(
            projects => {
                res.status(200).send({
                    projects: projects,
                    msg: 'your projects have been recieved'
                })
            }
        )
    } catch (err) {
        // if there's any other error, return a 500 response with an error message
        res.status(500).json({
            msg: `Sorry we could not find your todo's ${err}`
        });
    };

})


module.exports = router
