// Import DataTypes from sequelize for specifying field types.
const { DataTypes } = require("sequelize");

// Import the database connection
const db = require("../db");

const bcrypt = require('bcryptjs');


// Define the User model and its fields using Sequelize's define() method.
const User = db.define("user", {

    // A unique ID field for each user. A UUID field is used for uniqueness.
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },

    // A field for the username of each user. It should be a string and is required.
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    // A field for the email address of each user. It should be a string and is required and unique.
    // Validation is added to make sure it is a valid email address.
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Email is invalid please enter a valid email:(example@email.com) "
            },
            notNull: {
                msg: "Must enter an email address"
            }
        }
    },


    // A field for the password of each user. It should be a string and is required.
    // Validation is added to make sure it is a strong password.
    // After validation, the password is hashed using bcrypt.
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
                msg: "Password must be at least 8 characters long contain at least one lowercase letter [a-z] contain at least one uppercase letter [A-Z] contain at least one digit [\d] contain at least one special character from the set of characters [#$^+=!*()@%&]"
            },
            notNull: {
                msg: "Password cannot be blank"
            }
        }
    },

    confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Please confirm your password'
            },
            matchesPassword: function (value) {
                if (value !== this.password) {
                    throw new Error('Passwords do not match')
                }
            }
        }
    }
}, {
    // Sequelize hook for running a function after validating the model.
    // Here, it is used to hash the password using bcrypt before saving the user.
    hooks: {
        afterValidate: function (user) {
            user.password = bcrypt.hashSync(user.password, 10)
            user.confirmPassword = bcrypt.hashSync(user.confirmPassword, 10)
        },
    },

    validate: {
        passwordsMatch: function () {
            if (this.password !== this.confirmPassword) {
                throw new Error('Passwords do not match')
            }
        }
    }
})

// Export the User model.
module.exports = User
