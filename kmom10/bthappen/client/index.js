#!/usr/bin/env node

/**
 * Program to run the client
 *
 */
"use strict";

const VERSION = "1.0.0";

// For CLI usage
var path = require("path");
var scriptName = path.basename(process.argv[1]);
var args = process.argv.slice(2);
var arg;

var Client = require("./Client.js");


var client = new Client();

const LINUX_PORT = process.env.LINUX_PORT;
var port = 1337;

if ('LINUX_PORT' in process.env) {
    port = LINUX_PORT;
    console.log(`LINUX_PORT is set on ${port}.`);
} else {
    console.log("LINUX_PORT is not set.");
}

const LINUX_SERVER = process.env.LINUX_SERVER;
var domain = 'localhost';

if ('LINUX_SERVER' in process.env) {
    domain = LINUX_SERVER;
    console.log(`LINUX_SERVER is set on ${domain}.`);
} else {
    console.log("LINUX_SERVER is not set.");
}

var server = `http://${domain}:${port}`;

// Make it using prompt
var readline = require("readline");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



/**
 * Display helptext about usage of this script.
 */
function usage() {
    console.log(`Usage: ${scriptName} [options]

Options:
 -h               Display help text.
 -v               Display the version.
 --server <url>   Set the server url to use.`);
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

        case "--server":
            domain = args.shift();
            if (domain === undefined) {
                badUsage("--server must be followed by a url.");
                process.exit(1);
            } else {
                server = `http://${domain}:${port}`
            }
            break;
            
        case "--port":
            port = Number.parseInt(args.shift());
            if (Number.isNaN(port)) {
                badUsage("--port must be followed by a port number.");
                process.exit(1);
            } else {
                server = `http://${domain}:${port}`
            }
            break;
        
        case "--develop":
        process.env.NODE_ENV = 'development';
            break;

        default:
            badUsage("Unknown argument.");
            process.exit(1);
            break;
    }
}



/**
 * Display a menu.
 */
function menu() {
    console.log(`Commands available:

    exit                       Leave this program.
    menu                       Print this menu.
    url                        Get url to view the server in browser.
    list            [maxviews] List all rooms.
    view    <id>               View the room with the selected id.
    house   <house> [maxviews] View the names of all rooms in this building (house).
    search  <string>[maxviews] View the details of all matching rooms (one per row).
    searchp <string>[maxviews] Priority search, viewing best matches.`);
}


/**
 * Callbacks for client questions.
 */
rl.on("line", function (line) {
    // Split incoming line with arguments into an array
    var args = line.trim().split(" ");

    args = args.filter(value => {
        return value !== "";
    });

    switch (args[0]) {
        case "exit":
            console.log("Bye!");
            process.exit(0);
            break;

        case "menu":
            menu();
            rl.prompt();
            break;
        
        case "list":
        let maxl = args[1];
            client.list(maxl)
                .then(value => {
                    console.log(value.replace(new RegExp('},{', 'g'), '},\n{'))
                    rl.prompt();
                })
                .catch(err => {
                    console.log("FAILED: Could not list.\nDetails: " + err);
                    rl.prompt();
                });
            break;
        
        case "view":
            let id = args[1];
            client.view(id)
                .then(value => {
                    console.log(value.replace(new RegExp('},{', 'g'), '},\n{'))
                    rl.prompt();
                })
                .catch(err => {
                    console.log("FAILED: Could not view the room.\nDetails: " + err);
                    rl.prompt();
                });
            break;

        case "house":
            let houseId = args[1];
            let maxh;
            maxh = args[2];
            client.house(houseId, maxh)
                .then(value => {
                    console.log(value.replace(new RegExp('},{', 'g'), '},\n{'))
                    rl.prompt();
                })
                .catch(err => {
                    console.log("FAILED: Could not view the house.\nDetails: " + err);
                    rl.prompt();
                });
            break;
        
        case "search":
            let searchStr = args[1];
            let maxs;
            if (args[2] !== undefined && isNaN(args[2])) {
                searchStr = searchStr + " " + args[2];
                maxs = args[3];
            } else if (args[2] !== undefined) {
                maxs = args[2];
            }

            client.search(searchStr, maxs)
                .then(value => {
                    console.log(value.replace(new RegExp('},{', 'g'), '},\n{'))
                    rl.prompt();
                })
                .catch(err => {
                    console.log("FAILED: Could not view the search.\nDetails: " + err);
                    rl.prompt();
                });
            break;
        
        case "searchp":
            let searchpStr = args[1];
            let maxp;
            if (args[2] !== undefined && isNaN(args[2])) {
                searchpStr = searchpStr + " " + args[2];
                maxp = args[3];
            } else if (args[2] !== undefined) {
                maxp = args[2];
            }
            client.searchp(searchpStr, maxp)
                .then(value => {
                    console.log(value.replace(new RegExp('},{', 'g'), '},\n{'))
                    rl.prompt();
                })
                .catch(err => {
                    console.log("FAILED: Could not view the search.\nDetails: " + err);
                    rl.prompt();
                });
            break;

        case "url":
            console.log("Click this url to view the server in a browser.\n" + server + "/");
            rl.prompt();
            break;

        default:
            console.log("Enter 'menu' to get an overview of what you can do here.");
            rl.prompt();
    }
});

rl.on("close", function() {
    console.log("Bye!");
    process.exit(0);
});

// Main
client.setServer(server);
console.log("Use -h to get a list of options to start this program.");
console.log("Ready to talk to server url '" + server + "'.");
console.log("Use 'menu' to get a list of commands.");
rl.setPrompt("Client$ ");
rl.prompt();
