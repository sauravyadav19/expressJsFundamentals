// Importing our required Modules:
// Express => is our backend framework.
// path => for using an absolute path for configuration rather than relative.
const express = require('express');
const path = require('path');

//Creating an Instance our Express app:
const app = express();

// Properties that need Configuration:
// Port on which server is listening for incoming Request
const port = 8545;
//Setting up the Templating Engine
app.set('view engine', 'ejs');
// Setting up a absoulte Path of '/views' directory
app.set('views', path.join(__dirname,'/views'));
//Serving files (stored in root-Directory/public directory)
app.use(express.static(path.join(__dirname,'public')));

//Route Handlers
app.get('/',(request,response)=>{
    response.render('index.ejs')
})

app.listen(port,()=>{
    console.log("LISTENING ON PORT 8545...");
})