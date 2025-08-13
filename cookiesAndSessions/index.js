const express = require('express');
//Express has created a diffferent package to parse cookies
const cookieParser = require('cookie-parser');
const app = express();

// we are creating a middleware to parse cookies
// and since middleware runs on every incoming request
// with this middleware the cookie will be added on the incoming 
// request object and hence we can simply access it using
// request.cookie.<KeyOfTheCookie>
app.use(cookieParser());


app.get('/',(request,response)=>{
    // This is how we send cookie 
    // specifiy the the key as the first argument and value as the second argument
    // optionally you can pass the third argument which specifies other properties 
    // releated to this cookie, (like expiry,httpOnly... and others).
    response.cookie('Name','Saurav');
    response.send('This is your Home page')
})

app.get('/greetings',(request,response)=>{
    // Here we are accessing the cookies that we stored
    // since the we named our cookie "Name" when we are sending it
    // the cookie-parser adds a field in cookies with that same name
    // and hence we can access it like this:
    const userName = request.cookies.Name;
    response.send(`Welcome ${userName}`);
})

app.listen(8545,()=>{
    console.log('Listening on port 8545');
})