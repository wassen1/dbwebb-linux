#!/usr/bin/env node
/**
 * Main program for the a game of Gomoku.
 */
"use strict";

const VERSION = "1.0.0";

// import GomokuBoard from "./GomokuBoard.js";
var GomokuBoard = require("./GomokuBoard.js");



var size = 20,
    prompt = "Gomoku$ ",
    gameBoard;

gameBoard = new GomokuBoard();

var path = require('path');
var scriptName = path.basename(process.argv[1]);
var args = process.argv.slice(2);

var readline = require("readline");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Display helptext about usage of this script.
 */
function usage() {
    console.log(`Usage: ${scriptName} [options] <min> <max>

Options:
 -h        Display help text.
 -v        Display the version.`);
}

/**
 * Display version.
 */
function version() {
    console.log(VERSION);
}

/**
 * Place a marker on the board.
 */
function placeMarker(arr) {
    var x, y,
    player = gameBoard.playerInTurn();

    if (!gameBoard.isFull()) {
        x = parseInt(arr[0]);
        y = parseInt(arr[1]);
        if (gameBoard.isPositionTaken(x, y)) {
            console.log(`position ${x, y} is taken`);
            return;
        }
    }
    gameBoard.place(x, y);

    
    console.log(">>> " + player + " places " + x + " " + y + "\n");
    console.log(gameBoard.asAscii());
}


/**
 * Callbacks for game asking question.
 */
rl.on("line", function(line) {
    switch (line.trim()) {
        case "exit":
            console.log("Bye!");
            process.exit(0);
            break;
        default:
            placeMarker(line.trim().split(' '));
    }
    rl.prompt();
});



rl.on("close", function() {
    rl.write("Bye!");
    process.exit(0);
});

// Walkthrough all arguments checking for options.
var remaining = [];

args.forEach((arg) => {
    switch (arg) {
        case '-h':
            usage();
            process.exit(0);
            break;

        case '-v':
            version();
            process.exit(0);
            break;

        default:
            remaining.push(arg);
            break;
    }
});

// Check if there is remaining arguments that should be used
if (remaining.length >= 2) {
    console.log('>= 2');
    // min = parseInt(remaining[0], 10);
    // max = parseInt(remaining[1], 10);
} else if (remaining.length === 1) {
    size = parseInt(remaining[0], 10);
}


// Here starts the actual main program
console.log(">>> Start the game with board size of " + size);
gameBoard.start(size);

rl.setPrompt(prompt);
rl.prompt();
