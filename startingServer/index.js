// Importing express after installing it using npm
import express from 'express';
// creating an instance of express
const app = express();
// specify the port on which the server would be listening to..
const port = 8545;



// this is telling express that you have to listen to the port and do what the callback is asking you to
app.listen(port, ()=>{

    console.log(`Listening on the port ${port}`);
})



// this is saying that if we get a GET request at the sepcfied path, execute the callBack provided
// firt argument is the path, second is the callback that will exectuted.
app.get('/',(incomingRequest,outgoingResponse)=>{
    // so whenever we are sending a request for something,whether it is from the browser, postman or Api call
    // our express server handles it by parsing the incoming http request(plain text) into a javascript object
    // and then passes it as the first argument to the callback, the second argument to that callback is the response.
    // response is what you want the server to do when you get the specifed GET request from the path.
    
    // there is a .send function on our respone objcet it can send 

    // simple strings
    // outgoingResponse.send("This is a response for GET request made at the path '/'")

    //javscrpit object
     //outgoingResponse.send({user:'user101',password:'pass101'});
    
    // html response 
    //  outgoingResponse.send("<h1>This is an h1 respne from the server</h1>");

    // also remember that once you sent a response anything after that will not be sent as in
    // you cannot do both:
    outgoingResponse.send({user:'user101',password:'pass101'});
    outgoingResponse.send("<h1>This is an h1 respne from the server</h1>");

    //only the first respose will be sent and the other one will get ignore
})



// app.use() runs everytime there is an incoming request detected and we have not specfifed the path and, 
// what to do with that request, this run no matter the type meaning it could GET,POST or any other kind.
// its express way of making sure that every request is handled gracefully even if developer has not 
// specfifed a path. (you can use it to send 404)
// it too gets that requst and repsonse objects.
app.use((request,respone)=>{
    console.log("Incoming request detected");
    respone.send("<h1> 404 not Found </h1>");
})
