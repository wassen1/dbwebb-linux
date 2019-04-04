#!/usr/bin/env node

/**
 * @preserve dd8a5147a4528feb7768c0ee0a847cda
 *
 * dd8a5147a4528feb7768c0ee0a847cda
 * linux
 * node1
 * v1
 * fraa18
 * 2019-02-08 10:56:35
 * v3.1.3 (2018-09-13)
 *
 * Generated 2019-02-08 11:56:35 by dbwebb lab-utility v3.1.3 (2018-09-13).
 * https://github.com/dbwebb-se/lab
 */"use strict";


//import dbwebb from "./.dbwebb.js";
const dbwebb = require("./.dbwebb.js");

var ANSWER = null;
console.log(dbwebb.prompt + "Ready to begin.");



/** ======================================================================
 * node1 - JavaScript med Nodejs
 *
 * JavaScript using nodejs.
 *
 */



/** ----------------------------------------------------------------------
 * Section 1 . nodejs built-ins
 *
 * In this section we try out some of the new nodejs and ES6 features.
 *
 */



/**
 * Exercise 1.1 (1 points)
 *
 * Create a variable called `numbersArray` holding the numbers 2,48,19,12,93.
 *
 * Use find to get the first occurence of a number bigger than or equal to 42.
 *
 * Answer with the number.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */


var numbersArray = [2,48,19,12,93];

var biggerThan42 = numbersArray.find((element) => {
    return element >= 42;
});

ANSWER = biggerThan42;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.1", ANSWER, false);

/**
 * Exercise 1.2 (1 points)
 *
 * Find the smallest number in `numbersArray` by using the spread operator
 * `...` and the function `Math.min()`.
 *
 * Answer with the smallest number.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

var minNumber = Math.min(...numbersArray);

ANSWER = minNumber;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.2", ANSWER, false);

/**
 * Exercise 1.3 (1 points)
 *
 * Create a function called `meaningOfLife()` with one default parameter with
 * the value of 42.
 *
 * The function should return the sentence 'The meaning of life is '
 * concatenated with the parameter.
 *
 * Answer with a call to the `meaningOfLife()` function without any
 * parameters.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */

 function meaningOfLife(test = 42) {
    return "The meaning of life is " + test;
 }

ANSWER = meaningOfLife();

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.3", ANSWER, false);

/**
 * Exercise 1.4 (1 points)
 *
 * Check if the word Antilope contains the letters 'oo'. Return true or false
 * depending on the answer.
 *
 * Tip: Use nodejs function `includes`.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */


ANSWER = "Antilope".includes("oo");

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.4", ANSWER, false);

/**
 * Exercise 1.5 (1 points)
 *
 * Check if the word Antilope starts with the letters 'El'. Return true or
 * false depending on the answer.
 *
 * Tip: Use nodejs function `startsWith`.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
ANSWER = "Antilope".startsWith('El');

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("1.5", ANSWER, false);

/** ----------------------------------------------------------------------
 * Section 2 . Filtering arrays
 *
 * In this section we filter arrays in different ways.
 *
 */



/**
 * Exercise 2.1 (1 points)
 *
 * Use `numbersArray` from above holding the numbers 2,48,19,12,93.
 *
 * Use a for-loop to save all numbers smaller than 42 in a new array.
 *
 * Answer with the resulting array.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
var newArray = [];
for (var i = 0; i < numbersArray.length; i++) {
    if (numbersArray[i] < 42) {
        newArray.push(numbersArray[i]);
    }
}

ANSWER = newArray;

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.1", ANSWER, false);

/**
 * Exercise 2.2 (1 points)
 *
 * Create a variable called `moreNumbersArray` holding the numbers
 * 2,48,19,12,93,66,21.
 *
 * Use the built-in higher-order function `filter` and a callback function to
 * filter out all numbers bigger than or equal to 42.
 *
 * Use arrow-notation to keep the code short and concise.
 *
 * Answer with the resulting array.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
var moreNumbersArray = [2, 48, 19, 12, 93, 66, 21];

ANSWER = moreNumbersArray.filter(element => element < 42);

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("2.2", ANSWER, false);

/** ----------------------------------------------------------------------
 * Section 3 . Transforming arrays
 *
 * In this section we change arrays using the higher-order functions map and
 * reduce.
 *
 */



/**
 * Exercise 3.1 (1 points)
 *
 * Create a variable called `stringArray` holding the strings 'Jim
 * Lovell','Jack Swigert','Fred Haise'.
 *
 * Use a for-loop to concatenate the string ' was on the apollo 13' too each
 * name in the array.
 *
 * Store the result in a new array and answer with that array.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
var stringArray = ['Jim Lovell', 'Jack Swigert', 'Fred Haise'];


ANSWER = stringArray.map(element => element + ' was on the apollo 13');

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.1", ANSWER, false);

/**
 * Exercise 3.2 (1 points)
 *
 * Use the `stringArray` from above and the built-in higher-order function
 * `map` to concatenate the string ' was not on the apollo 12' and each name.
 *
 * Use arrow notation to keep the code simple and concise.
 *
 * Answer with the resulting array.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */


ANSWER = stringArray.map(element => element + ' was not on the apollo 12');

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("3.2", ANSWER, false);

/** ----------------------------------------------------------------------
 * Section 4 . Extra assignments
 *
 * Solve these optional questions to earn extra points.
 *
 */



/**
 * Exercise 4.1 (3 points)
 *
 * Create a variable called `maybePrimeNumber` holding the numbers
 * 5,8,11,14,17,20,23,28,31.
 *
 * In a for-loop sum all prime numbers from `maybePrimeNumber`, you need to
 * find out whether or not the number is a prime number.
 *
 * Answer with the resulting sum.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
var maybePrimeNumber = [5, 8, 11, 14, 17, 20, 23, 28, 31];

function isItPrime(val) {
    for (let i = 2; i < val; i++) {
        if (val % i === 0) {
            return false;
        }
    }
    return val > 1;
}



ANSWER = maybePrimeNumber.filter(element => isItPrime(element))
.reduce((acc, cur) => acc + cur);

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("4.1", ANSWER, false);

/**
 * Exercise 4.2 (3 points)
 *
 * Create a function `isNotPrime()` that takes one parameter (an integer) and
 * tests if that number is a prime number. If the number is not prime, the
 * number is returned otherwise return 0.
 *
 * Create the variable `maybePrimeNumber` once more with the numbers
 * 5,8,11,14,17,20,23,28,31. Use the built-in higher-order function `reduce`
 * to sum all numbers in `maybePrimeNumber` that are NOT prime numbers.
 *
 * Answer with the resulting sum.
 *
 * Write your code below and put the answer into the variable ANSWER.
 */
var maybePrimeNumber = [5, 8, 11, 14, 17, 20, 23, 28, 31];
function isNotPrime(val) {
    for (let i = 2; i < val; i++) {
        if (val % i === 0) {
            return val;
        }
    }
    return 0;
}


ANSWER = maybePrimeNumber.filter(element => isNotPrime(element))
.reduce((acc, cur) => acc + cur);

// I will now test your answer - change false to true to get a hint.
dbwebb.assert("4.2", ANSWER, false);


process.exit(dbwebb.exitWithSummary());
