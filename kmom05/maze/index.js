/**
 * Main program to run the maze server
 *
 */
//import maze from './maze';
const MAZE = require("./maze");
const LINUX_PORT = process.env.LINUX_PORT;
var port = 1337;

if ('LINUX_PORT' in process.env) {
    port = LINUX_PORT;
    // Start the server to listen on port
    MAZE.listen(port);
} else {
    console.log("LINUX_PORT is not set.");
    // Start the server to listen on a port
    MAZE.listen(port);

}

console.log(`The maze server is now listening on: ${port} with process id ${process.pid}`);