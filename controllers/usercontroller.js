// User can register an account or login t0 an already existing account
const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/register', async (req, res) => {
    const
        {
            username,
            email,
            password
        } = req.body.users


    try {
        await models.UserModel.create({
            username: username,
            email: email,
            password: password,
        })
            .then(

                user => {

                    console.log(user)
                    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                    res.status(201).json({
                        user: user,
                        message: "user created",
                        sessionToken: `Bearer ${token}`
                    })
                }
            )

    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Username already in use'
            })
        } else if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                msg: err.errors.map(e => e.message)
            })
        } else {
            res.status(500).json({
                error: `Sorry we could not create your account ${err}`
            });
        };

    }
})
