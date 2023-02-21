// Require the jsonwebtoken library
const jwt = require('jsonwebtoken');

// Import the models object from a separate module
const { models } = require('../models');

// Define a middleware function to validate JSON web tokens (JWTs)
const validateJWT = async (req, res, next) => {

    // If the HTTP method is OPTIONS, continue to the next middleware
    if (req.method == 'OPTIONS') {
        next();
    }
    // Otherwise, if an "Authorization" header is present and includes "Bearer"
    else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {

        // Extract the token from the "Authorization" header and verify its signature
        const { authorization } = req.headers;
        const payload = authorization ? jwt.verify(
            authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization,
            process.env.JWT_SECRET
        ) : undefined;

        // If the token is valid, find the user associated with the token's ID
        if (payload) {
            console.log(payload);
            let foundUser = await models.UserModel.findOne({
                where: {
                    id: payload.id
                }
            });

            // If the user is found, add it to the request object and continue to the next middleware
            if (foundUser) {
                req.user = foundUser;
                next();

                // Otherwise, return an error response
            } else {
                res.status(400).send({
                    message: 'Not Authorized'
                });
            }
            // If the token is invalid, return an error response
        } else {
            res.status(401).send({
                message: 'Invalid token'
            });
        }
        // Otherwise, return an error response
    } else {
        res.status(403).send({
            message: 'Forbidden'
        });
    };
};

// Export the validateJWT function for use in other modules
module.exports = validateJWT;
