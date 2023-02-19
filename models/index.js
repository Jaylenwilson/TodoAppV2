// Import db file and define it as a variable db
const db = require('../db');

// Import models and define them as variables
const UserModel = require('./user');
const TodoModel = require('./todo');
const ProjectModel = require('./project');


// Data associations 

// Todo's belong to a user
TodoModel.belongsTo(UserModel)
// A user has multiple todo's
UserModel.hasMany(TodoModel)

// Projects belong to a User
ProjectModel.belongsTo(UserModel)
// A user has multiple projects
UserModel.hasMany(ProjectModel)

// Todo's belong to a project
TodoModel.belongsTo(ProjectModel)
// A project has many todo's
ProjectModel.hasMany(TodoModel)


// Export models as a module or object to be specific to allow them to be accessed by the controllers
module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        TodoModel,
        ProjectModel
    }
}