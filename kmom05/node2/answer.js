#!/usr/bin/env node

/**
 * @preserve type
 *
 * type
 * linux
 * node2
 * v1
 * fraa18
 * 2019-02-18 10:45:44
 * v3.1.3 (2018-09-13)
 *
 * Generated 2019-02-18 13:56:52 by dbwebb lab-utility v3.1.3 (2018-09-13).
 * https://github.com/dbwebb-se/lab
 */"use strict";


//import dbwebb from "./.dbwebb.js";
const dbwebb = require("./.dbwebb.js");

var ANSWER = null;
console.log(dbwebb.prompt + "Ready to begin.");



/** ======================================================================
 * Lab 4 - JavaScript with Nodejs
 *
 * JavaScript using nodejs. During these exercises we train on the built-in
 * nodejs modules filesystem, querystring and crypto.
 * Documentation can be found at [nodejs api](https://nodejs.org/api/).
 *
 */



/** ----------------------------------------------------------------------
 * Section 1 . Filesystem
 *
 * This section is about the built-in module filesystem and how to read and
 * write files synchronously.
 *
 */



/**
 * Exercise 1.1 (1 points)
 *
 * Start by requiring the filesystem module `fs`.
 *
 * Use the `fs` module and the function `readFileSync` to read the entire
 * `ircLog.txt` in UTF-8 encoding into a variable. Answer with the number of
 * characters in the file.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

const FS = require("fs");

var text = FS.readFileSync('ircLog.txt', 'utf8');

ANSWER = text.length;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.1", ANSWER, false);

/**
 * Exercise 1.2 (1 points)
 *
 * Use your variable from the exercise above and answer with the contents on
 * line 4.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
;
var line4 = text.split('\n')[3];
ANSWER = line4;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.2", ANSWER, false);

/**
 * Exercise 1.3 (1 points)
 *
 * Write line number 4 of `ircLog.txt` to a new file that you create called
 * `highlights.txt`. Replace `highlights.txt` if it already exists.
 * Answer with characters 7 through 10 from `highlights.txt`.
 *
 * Tip: Use the function `writeFileSync()` when writing to files.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

FS.writeFileSync('highlights.txt', line4);
var highlights = FS.readFileSync('highlights.txt', 'utf8');

var highlights7_10 = highlights.slice(6, 9);


ANSWER = highlights7_10;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.3", ANSWER, true);

/** ----------------------------------------------------------------------
 * Section 2 . querystring
 *
 * This section is about the built-in module querystring and how to parse and
 * encode query strings.
 *
 */



/**
 * Exercise 2.1 (1 points)
 *
 * Start by requiring the querystring module `querystring`.
 *
 * Use the `querystring` module to parse a query string
 * 'first_name=Pete&last_name=Conrad&mission=Apollo12'. Answer with the value
 * of mission.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

const QS = require('querystring');
var query = QS.parse('first_name=Pete&last_name=Conrad&mission=Apollo12');

ANSWER = query.mission;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.1", ANSWER, false);

/**
 * Exercise 2.2 (1 points)
 *
 * Use the parsed query string from above to concatenate the astronaut's full
 * name with the string ' was on the ' and the mission that the astronaut was
 * on.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */


var pete = `${query.first_name} ${query.last_name} was on the ${query.mission}`;


ANSWER = pete;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.2", ANSWER, false);

/**
 * Exercise 2.3 (1 points)
 *
 * Create a javascript object with the following attributes and values:
 *
 * url = https://dbwebb.se/
 * id = 17
 * payload = aHR0cHM6Ly9kYndlYmIuc2Uv
 * type = csv
 *
 *
 * Encode the javascript object as a querystring and answer with the encoded
 * query string.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
var testObj = {
    url: 'https://dbwebb.se/',
    id: 17,
    payload: 'aHR0cHM6Ly9kYndlYmIuc2Uv',
    type: 'csv'
};

var queryFromObj = QS.stringify(testObj)

ANSWER = queryFromObj;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.3", ANSWER, false);

/** ----------------------------------------------------------------------
 * Section 3 . crypto
 *
 * This section is about the built-in module crypto and how to encrypt data
 * with nodejs.
 *
 */



/**
 * Exercise 3.1 (1 points)
 *
 * Start by requiring the `crypto` module.
 *
 * Use the `crypto` module to create a hash of 'Forever trusting who we are'
 * using the `sha256` algorithm.
 *
 * Answer with a digest of the hash in `hex` format.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

const CRYPTO = require('crypto');
let secret = 'Forever trusting who we are';
let hash = CRYPTO.createHash('sha256').update(secret).digest('hex');

ANSWER = hash;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.1", ANSWER, false);

/**
 * Exercise 3.2 (1 points)
 *
 * Create an array called `cryptoStrings` holding the strings 'Forever
 * trusting who we are', 'And nothing else matters', 'Never opened myself this
 * way', 'Life is ours, we live it our way'.
 *
 * Use filter to create an array only containing elements that has the string
 * 'nothing else matters' in them.
 *
 * Answer with the array.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
let cryptoStrings = ['Forever trusting who we are', 'And nothing else matters', 'Never opened myself this way', 'Life is ours, we live it our way'];
let nEM = cryptoStrings.filter((element) => element.indexOf('nothing else matters') > -1);

ANSWER = nEM;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.2", ANSWER, false);

/**
 * Exercise 3.3 (1 points)
 *
 * Use the array from above only containing elements with 'nothing else
 * matters'.
 *
 * For the elements in the array create a hex digest of a hash created with
 * with the `sha256` algorithm of each element.
 *
 * Answer with the array of hashes.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
let hashes = nEM.map(element => {
    return CRYPTO.createHash('sha256').update(element).digest('hex');
});


ANSWER = hashes;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.3", ANSWER, false);

/**
 * Exercise 3.4 (1 points)
 *
 * Use `filter` to keep all elements in `cryptoStrings` that contains both an
 * 'i', an 'e', and a 'm', check both capital and non-capital letters.
 *
 * For the remaining elements create a hex digest of a hash created with with
 * the `sha256` algorithm of each remaining element.
 *
 * Answer with the array of hashes.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

function containsIEM(value, index, array) {
    if (value.toLowerCase().indexOf('i') > -1 && value.toLowerCase().indexOf('e') > -1 && value.toLowerCase().indexOf('m') > -1) {

        return true;
    }
}

let IEM = cryptoStrings.filter(containsIEM);
let hashedIEM = IEM.map(element => CRYPTO.createHash('sha256').update(element).digest('hex'));


ANSWER = hashedIEM;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.4", ANSWER, true);

/**
 * Exercise 3.5 (1 points)
 *
 * Using the same `cryptoStrings` array from above remove all elements that
 * does NOT contain 'matters', check both capital and non-capital letters.
 *
 * For the remaining elements create a HMAC using the `sha256` algorithm and
 * the secret 'metallica' for each element. Create a `base64` digest of the
 * HMAC for each element.
 *
 * Answer with the array of HMACs.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
let matters = cryptoStrings.filter(element => element.toLowerCase().indexOf('matters') > -1);

let mattersHAMACs = matters.map(element => CRYPTO.createHmac('sha256', 'metallica').update(element).digest('base64'));



ANSWER = mattersHAMACs;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.5", ANSWER, false);


process.exit(dbwebb.exitWithSummary());
