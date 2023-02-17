// Import db file and define it as a variable db
const db = require('../db');

// Import models and define them as variables
const UserModel = require('./user');
const TodoModel = require('./todo');
const TodoCategoryModel = require('./todocategory');


module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        TodoModel,
        TodoCategoryModel
    }
}