const express = require("express"); 
const studentsRouter = require("./src/services/index");

const server = express() //create http server with express

const port = 3000; //on port number-can-be-changed

server.use(express.json()); //tell express to parse the request body

server.use('/students', studentsRouter) //router and the part of the url that should be noticed

server.listen(port, () => { //port number and a callback, server run and listen to port
    console.log(`Hello, your Server is running on port ${port}`); //`${can change port number}`
});