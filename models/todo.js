// object destructuring is used to extrapolate the DataTypes object from the sequelize dependency. 
const { Datatypes } = require('sequelize')
//  import the connection to our database that we set up in the db.js. This will unlock methods from the sequelize connection that we can call upon.
const db = require("../db")
const Todo = db.define("todo", {

})