const express = require('express');
const app = express();


app.get('/',(request,response)=>{
    response.send('This is your Home page')
})

app.listen(8545,()=>{
    console.log('Listening on port 8545');
})