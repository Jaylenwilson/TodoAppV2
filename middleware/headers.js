// This middleware sets the appropriate response headers for allowing cross-origin requests
// This is a middleware function that sets the headers for CORS (Cross-Origin Resource Sharing) on incoming HTTP requests. 
// Here's what each line of the function does:
// res.header("access-control-allow-origin", "*");: 
// sets the Access-Control-Allow-Origin header to "*" which means that any website can make requests to this server.
// res.header("access-control-allow-methods", "GET, POST, PUT, DELETE");: 
// sets the Access-Control-Allow-Methods header to "GET, POST, PUT, DELETE" which allows these HTTP methods for CORS requests.
// res.header("access-control-allow-headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");: 
// sets the Access-Control-Allow-Headers header to a list of headers that the client is allowed to include in the request.
// next();: passes control to the next middleware function in the request-response cycle.
module.exports = (req, res, next) => {
    res.header("access-control-allow-origin", "*"); // set the value of the Access-Control-Allow-Origin header to '*'
    res.header("access-control-allow-methods", "GET, POST, PUT, DELETE"); // set the value of the Access-Control-Allow-Methods header to 'GET, POST, PUT, DELETE'
    res.header(
        "access-control-allow-headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    ); // set the value of the Access-Control-Allow-Headers header to the specified string

    next(); // call the next middleware in the chain
};
