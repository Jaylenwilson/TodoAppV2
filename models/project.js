const { DataTypes } = require('sequelize');
const db = require('../db')

const Project = db.define('project', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },

    project: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "You must enter a project name to create one"
            }
        }
    }

})

module.exports = Project