//Importing Express
const express = require("express");
//Creating an Instance of Express
const app = express();
//Port on which Express would listen for incomming request 
const port = 8545;

//-------------------------------------------------------------------------------------------------------------------

//ANALOGY: Say you want to send a letter to a company, on the envelope, you will not just write the building
// address, but rather the full address, which includes the floor number, department, so it can be delivered
// properly; Similary when server get an HTTP request, a very specific path on your website is being accessed
// To handle this we create routes, that tells server if an incoming request comes for this path do this.

//Here is paralle comparsion:
// The Building = your Express Server/Application
// The incoming Letter = HTTP Request from the user
// Address on the Letter = the requested URL path (/, /about, /contactUs) and the request type (GET,POST, PUT, DELETE)
// the Mailroom = The Express Router
// Department who recives the letter : the Handler Function (The function that runs when path is matched)

// -------------------------------------------------------------------------------------------------------------------

// This is a route defined for the path domainName/home's GET request
// the function took the path and what will happen when when someone sends a GET request to that path (handler)
// as its argument.
//
app.get('/home',(request,response)=>{

    respond.send("Hello There this is Home Page")
    
})
app.get('/aboutus',(request,respone)=>{
    response.send("This is the about us page")
})

// Starting the server and listening for incomming request
app.listen(port,()=>{
    console.log("Listening on port 8545");
})