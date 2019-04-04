/**
 * Server with routes.
 * URLS:
 *  localhost:[port]/           - home page.
 *  localhost:[port]/index.html - index page.
 *  localhost:[port]/status     - status page.
 *  localhost:[port]/sum        - sum page.
 *  localhost:[port]/filter     - filter page.
 *  localhost:[port]/*          - 404 page.
 */
"use strict";
const PATH = require("path");
const FS = require("fs");
const HTTP = require("http");
const ROUTES = require("./routes.js");
const LINUX_PORT = process.env.LINUX_PORT;
const URL = require("url");


var server = HTTP.createServer((req, res) => {
    var ipAddress;
    var   urlParts;
    var   route;
  
    //Log incoming requests
    ipAddress = req.connection.remoteAddress;

    // Check what route is requested
    route = URL.parse(req.url).pathname;

    // Check what route is requested
    urlParts = URL.parse(req.url, true);
    route = urlParts.pathname;
  

    // Switch (route) on the path.
    switch (route) {
        case "/":
            ROUTES.home(res);
            break;

        case "/index.html":
            ROUTES.index(res);
            break;

        case "/status":
        ROUTES.status(res);
        break;

        case "/sum":
        ROUTES.sum(res, req, route, urlParts, ipAddress);
        break;

        case "/filter":
        ROUTES.filter(res, req, route, urlParts, ipAddress);
        break;

        default:
            ROUTES.notFound(res);
            break;
    }
});

// Write pid to file
var pidFile = PATH.join(__dirname, "pid");

FS.writeFile(pidFile, process.pid, function(err) {
    if (err) {
        return console.log(err);
    }

    console.log("Wrote process id to file 'pid'");
});

console.log(`Simple server listen on port ${LINUX_PORT} with process id ${process.pid}`);

/**
 * Listen on SIGINT, SIGTERM
 */
function controlledShutdown(signal) {
    console.warn(`Caught ${signal}. Removing pid-file and will then exit.`);
    FS.unlinkSync(pidFile);
    process.exit();
}

// Handle WIN32 signals in a specific mode
if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}

// Add event handlers for signals
process.on("SIGTERM", () => { controlledShutdown("SIGTERM"); });
process.on("SIGINT", () => { controlledShutdown("SIGINT"); });

// Export the server as a module.
module.exports = server;
