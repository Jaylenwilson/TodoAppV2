// Importing required packages and modules
const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { Op } = require('sequelize');

// POST request to create a new user account
router.post('/register', async (req, res) => {
    const
        {
            username,
            email,
            password
        } = req.body.users

    try {
        // Creating a new user using the Sequelize Model
        await models.UserModel.create({
            username: username,
            email: email,
            password: password,
        })
            .then(

                user => {
                    // Creating and returning a JSON Web Token if user is successfully created
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                    res.status(201).json({
                        user: user,
                        message: "user created",
                        sessionToken: `Bearer ${token}`
                    })
                }
            )

    } catch (err) {
        // Handling error if username is already in use
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Username already in use'
            })
        }
        // Handling error if validation error occurs
        else if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
            })
        }
        // Handling other types of errors
        else {
            res.status(500).json({
                error: `Sorry we could not create your account ${err}`
            });
        };
    }
})

// POST request to login with username or email and password
router.post('/login', async (req, res) => {
    const { emailOrUsername, password } = req.body.user;

    try {
        // Querying the database to find a user with email or username provided
        const user = await models.UserModel.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            }
        });

        if (user) {
            // Checking if the password provided matches the hashed password in the database
            bcrypt.compare(password, user.password, (err, matches) => {
                if (matches) {
                    // Creating and returning a JSON Web Token if password matches
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                    return res.status(200).json({
                        user: user,
                        message: 'Logged in successfully',
                        sessionToken: `Bearer ${token}`
                    });
                } else {
                    // Returning an error if password does not match
                    return res.status(500).json({ error: 'Incorrect credentials' });
                }
            });
        } else {
            // Returning an error if user does not exist
            return res.status(502).json({ error: 'User does not exist' });
        }
    } catch (err) {
        // Handling error if validation error occurs
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
            });
        }
        // Handling other types of errors
        else {
            return res.status(500).send({ message: "Sorry we could not login to your account" });
        }
    }
});

// Exporting the router
module.exports = router
