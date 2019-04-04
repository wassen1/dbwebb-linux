#!/usr/bin/env node
/**
 * Main program to run the server
 *
 */
"use strict";

const VERSION = "1.0.0";

// For CLI usage
var path = require("path");
var scriptName = path.basename(process.argv[1]);
var args = process.argv.slice(2);
var arg;

const SERVER = require("./server");
const LINUX_PORT = process.env.LINUX_PORT;
var port = 1337;

if ('LINUX_PORT' in process.env) {
    port = LINUX_PORT;
}

/**
 * Display helptext about usage of this script.
 */
function usage() {
    console.log(`Usage: ${scriptName} [options]

Options:
 -h               Display help text.
 -v               Display the version.
 --port <number>  Run server on this port.
 --develop        Run in develop mode.`);
}



/**
 * Display helptext about bad usage.
 *
 * @param String message to display.
 */
function badUsage(message) {
    console.log(`${message}
Use -h to get an overview of the command.`);
}



/**
 * Display version.
 */
function version() {
    console.log(VERSION);
}



// Walkthrough all arguments checking for options.
while ((arg = args.shift()) !== undefined) {
    switch (arg) {
        case "-h":
            usage();
            process.exit(0);
            break;

        case "-v":
            version();
            process.exit(0);
            break;

        case "--port":
            port = Number.parseInt(args.shift());
            if (Number.isNaN(port)) {
                badUsage("--port must be followed by a port number.");
                process.exit(1);
            }
            break;

        case "--develop":
            process.env.NODE_ENV = 'development';
            break;

        default:
            //remainingArgs.push(arg);
            badUsage("Unknown argument.");
            process.exit(1);
            break;
    }
}

SERVER.listen(port);
// console.log('NODE ENV: ', process.env.NODE_ENV)
console.log(`The server is now listening on: ${port} with process id ${process.pid}`);