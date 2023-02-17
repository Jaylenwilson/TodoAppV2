const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

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
    password: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            is: {
                args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
                msg: "Password must be at least 8 characters at least one upper case letter 1 lower case and one symbol"
            },
            notNull: {
                msg: "Must create a password"
            }
        }
    }
}, {
    /**
     * * * Sequelize Hook
     * allows access to sequelize hooks
     * these are life cycle methods in this example the value a user inputs for password is encrypted AFTER VALIDATION
     */
    hooks: {
        afterValidate: function (user) {
            user.password = bcrypt.hashSync(user.password, 10)
        },
    }
})

module.exports = User