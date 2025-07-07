//Importing Express
const express = require("express");
//Creating an Instance of Express
const app = express();
//Port on which Express would listen for incomming request 
const port = 8545;


// Starting the server and listening for incomming request
app.listen(port,()=>{
    console.log("Listening on port 8545");
})