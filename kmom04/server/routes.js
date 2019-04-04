/**
 * Routes.
 *
 */
"use strict";

var routes = {};
const CHILD = require("child_process");

/**
 * Home route
 */
routes.home = (res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello World!");
};

/**
 * Index route.
 */
routes.index = (res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is the file index.html.");
};

/**
 * Status route.
 */
routes.status = (res) => {
    // Execute a child process, in this case "uname".
    CHILD.exec("uname -a", (error, stdout, stderr) => {
        if (error || stderr) {
            // Do something with the error(s)
            console.log("Something went wrong...", error, stderr);
        }
        // The object that later will be sent to via the response
        var data = {
            "uname": stdout
        };

        // Write the result of standard output as JSON object.
        res.writeHead(200, { "Content-Type": "application/json" });
        // Converts the Javascript-object to a string to be sent to the client
        var jsonObj = JSON.stringify(data, null, 4);
        res.end(jsonObj);
    });
};

/**
 * Sum route.
 */
routes.sum = (res, req, route, urlParts, ipAddress) => {
    var qs = require("querystring");
    var util = require("util");
    var query;
    var queryString;

     query = urlParts.query;
     queryString = qs.stringify(query);
 
     console.log(
         "Incoming route "
         + route
         + " from ip "
         + ipAddress
         + " with querystring "
         + queryString
     );
 
     // Inspect the details of the object created for the query string
     console.log(util.inspect(query));
 
     // Loop through all query variables
     var sumOfKeys = Object.keys(query).reduce( (acc, cur) => {
         return acc + +cur;
     }, 0);
 
     // The object that later will be sent to via the response
     var data = {
        "sum": sumOfKeys
    };

    // Write the result of standard output as JSON object.
    res.writeHead(200, { "Content-Type": "application/json" });
    // Converts the Javascript-object to a string to be sent to the client
    var jsonObj = JSON.stringify(data, null, 4);
    res.end(jsonObj);
};

/**
 * Filter route.
 */
routes.filter = (res, req, route, urlParts, ipAddress) => {
    var qs = require("querystring");
    var util = require("util");
    var query;
    var queryString;

    query = urlParts.query;
    queryString = qs.stringify(query);

    console.log(
        "Incoming route "
        + route
        + " from ip "
        + ipAddress
        + " with querystring "
        + queryString
    );
 
     // Inspect the details of the object created for the query string
     console.log(util.inspect(query));
 
     // Loop through all query variables
     var keys = Object.keys(query).filter( key => {
         return key <= 42;
     }, 0);
     console.log(keys);
 
     // The object that later will be sent to via the response
     var data = {
        "filter": keys
    };

    // Write the result of standard output as JSON object.
    res.writeHead(200, { "Content-Type": "application/json" });
    // Converts the Javascript-object to a string to be sent to the client
    var jsonObj = JSON.stringify(data, null, 4);
    res.end(jsonObj);
};

/**
 * Not Found route.
 */
routes.notFound = (res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404. No route matching.\n");
};

// Export as a module
module.exports = routes;
