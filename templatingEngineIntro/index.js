const express = require('express'); // importing express
const app = express(); // creating an instance of express
const port = 8545; // defining the port on which our server would be listening


//Handler when there is an incoming request on the port
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})