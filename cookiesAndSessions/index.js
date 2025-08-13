const express = require('express');
const app = express();


app.get('/',(request,response)=>{
    // This is how we send cookie 
    // specifiy the the key as the first argument and value as the second argument
    // optionally you can pass the third argument which specifies other properties 
    // releated to this cookie, (like expiry,httpOnly... and others).
    response.cookie('Name','Saurav');
    response.send('This is your Home page')
})

app.listen(8545,()=>{
    console.log('Listening on port 8545');
})