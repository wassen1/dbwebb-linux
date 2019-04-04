/**
 * Main program to run a server.
 *
 */
"use strict";

//import server from "./serverWithRoutes.js";
const SERVER = require("./server.js");
const LINUX_PORT = process.env.LINUX_PORT;

if ('LINUX_PORT' in process.env) {
    // Start the server to listen on port
    SERVER.listen(LINUX_PORT);
    console.log('Simple server with routes listen on port', LINUX_PORT);
} else {
    console.log("LINUX_PORT is not set.");
    // Start the server to listen on a port
    SERVER.listen(1337);
    console.log(`Simple server with routes listen on port 1337.`);

}



