// This middleware sets the appropriate response headers for allowing cross-origin requests
module.exports = (req, res, next) => {
    res.header("access-control-allow-origin", "*"); // set the value of the Access-Control-Allow-Origin header to '*'
    res.header("access-control-allow-methods", "GET, POST, PUT, DELETE"); // set the value of the Access-Control-Allow-Methods header to 'GET, POST, PUT, DELETE'
    res.header(
        "access-control-allow-headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    ); // set the value of the Access-Control-Allow-Headers header to the specified string

    next(); // call the next middleware in the chain
};
