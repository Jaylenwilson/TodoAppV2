// object destructuring is used to extrapolate the DataTypes object from the sequelize dependency. 
const { DataTypes } = require('sequelize')
//  import the connection to our database that we set up in the db.js. This will unlock methods from the sequelize connection that we can call upon.
const db = require("../db")
const Todo = db.define("todo", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(155),
        allowNull: false,
        validate: {
            notNull: {
                msg: "Must enter a title"
            }
        }
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    priority: {
        type: DataTypes.INTEGER
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})
module.exports = Todo