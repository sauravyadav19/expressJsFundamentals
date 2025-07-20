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

    response.send("Hello There this is Home Page")
    
})
app.get('/aboutus',(request,response)=>{
    response.send("This is the about us page")
})

// there are times when none of our defined handler gets a match.. but we still want to handle the
// incoming request very gracefully, so for that we have something called a fallback handler
// we use the wildcard (*) , this is a way of identifing using regular express (/^.*$/) match all path.
// earlier is just use to be app.get('*', handler) but to make it future proof express switched to 
// more regular-expression--ish

// this will handle all the un-matched GET request, we can define a route handler for other verbs POST,DELETE

app.get(/^.*$/, (req, res) => {
  res.send("This is wildcard handler route");
});

// also remember that ORDER OF HANDLER DO MATTERS.
// so if our fallback function were to be the first route handler, even if we have a sepcific route handler
// for a path, that will not match rather all the incoming request will match the wildcard and hence 
// will be resolved as such. 
// so  this is our order: 
  // app.get(/^.*$/, handler) [fallback handler]
  // app.get('/home', handler)
  // app.get('/aboutUs', handler)
// even though we have path for home and aboutUs sepcfied they will not be matched and fallback handler 
// will always win and hence resolving all the incoming request
// to avoid this but also getting the benfit of the handling all the incoming request gracefully, we
// place the fallback at the end.


// Starting the server and listening for incomming request
app.listen(port,()=>{
    console.log("Listening on port 8545");
})