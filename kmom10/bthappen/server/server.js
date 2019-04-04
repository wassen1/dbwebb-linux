/**
 * The server brain.
 */
"use strict";

// To parse the route from the url
const PATH = require("path");
const url = require("url");
const FS = require("fs");
const http = require("http");

// A better router to create a handler for all routes
const Router = require("./router");
const routes = require("./routes.js")

var router = new Router();

/**
 * Show list of API
 */
router.get("/", routes.getRoot);


/**
 * Returns list of all rooms
 */
router.get("/room/list", routes.getSalar);

/**
 * Show room
 */
router.get("/room/view/id/:number", routes.getRoom);

/**
 * Show rooms in house.
 */
router.get("/room/view/house/:house", routes.getHouse);

/**
 * Show search result.
 */
router.get("/room/search/:search", routes.getSearch);


router.get("/room/searchp/:search", routes.getSearchP);



/**
 * Create the server.
 */
var server = http.createServer((req, res) => {
    var ipAddress,
        route;

    // Log incoming requests
    ipAddress = req.connection.remoteAddress;

    // Check what route is requested
    route = url.parse(req.url).pathname;
    console.log("Incoming route " + route + " from ip " + ipAddress);

    // Let the router take care of all requests
    router.route(req, res);
});


// Write pid to file
var pidFile = PATH.join(__dirname, "pid");

FS.writeFile(pidFile, process.pid, function(err) {
    if (err) {
        return console.log(err);
    }

    console.log("Wrote process id to file 'pid'");
});



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


module.exports = server;
