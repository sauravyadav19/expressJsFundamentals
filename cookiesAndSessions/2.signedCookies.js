const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Unlike when we call cookie parser for our un-singed cookies
// we pass a secret phrase to our cookieParser middleware
app.use(cookieParser('thisIsThatPharase'));


app.get('/',(request,response)=>{
    // we know that we pass an object as the third argument
    // that contains options releated to our cookies (expiry, httpOnly ..etc)
    // one of those argument is 'signed' which instead of storing the key value
    // pair as a plain text that could be tampered with,signed cookies with the help
    // of our secret pharase that we are passing to our cookie parser middleware 
    // creates a sepcial phrase which is then stored in the client's brower, the special
    // pharase is itself not encrypted,in fact you can very well see the value of the key 
    // in it, it is just there to keep the integrity of the cookie, so we know for sure 
    // that things are not tampered with.
    response.cookie('Name','Saurav', {signed: true});
    response.send('This is your Home page')
})

app.get('/greetings',(request,response)=>{
    // to Access our cookie we instead of request.cookies we use request.signedCookies
    const userName = request.signedCookies.Name;
    response.send(`Welcome ${userName}`);
})

app.listen(8545,()=>{
    console.log('Listening on port 8545');
})