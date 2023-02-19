const db = require('../db')

// Exporting each file as a module. More specifically we are exporting everything as an object
// We define each as a property whos value is the import of each file
module.exports = {
    todocontroller: require('./todocontroller'),
    usercontroller: require('./usercontroller'),
    projectcontroller: require('./projectcontroller')
}