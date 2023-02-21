// import DataTypes object from sequelize dependency
const { DataTypes } = require('sequelize');
// import connection to database
const db = require('../db');

// define a Todo model, and set up the fields with their data types and options
const Todo = db.define('todo', {
    // id field - primary key, UUID data type with default value generated using UUIDv4, and not nullable
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    // title field - string data type with maximum length of 155 characters, not nullable, and has a validation rule to ensure it's not null
    title: {
        type: DataTypes.STRING(155),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Must enter a title'
            }
        }
    },
    // description field - string data type with maximum length of 255 characters, nullable
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    // priority field - integer data type, nullable
    priority: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    // completed field - boolean data type with default value of false, nullable
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
    // dueDate field - date-only data type, nullable
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
});

// export Todo model
module.exports = Todo;
