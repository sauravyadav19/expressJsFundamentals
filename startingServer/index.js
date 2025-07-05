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