const express = require('express'); // importing express
const app = express(); // creating an instance of express
const port = 8545; // defining the port on which our server would be listening
//--------------------------------------------------------------------------------------------------------------------------
// SETTING UP YOUR TEMPLATE ENGINE:
app.set('view engine','ejs') 
// this is us telling that we want to set the value of 'view engine' to 'ejs'.
// there are lot of other key-value pairs we can set using app.set().
// after setting up the 'view engine', we need not to "require ejs", the way we require express(line-1) because
// behind the scene express handle that for us.
// by default the express app would look for a file in your root directory of the project for a folder called 'views'.
// 'views'  folder will consist of the files (combination of html and javascript) with an extension of name of your template 
// engine (here .ejs).
// we can set it to a differnt path, if we want to using app.set('views','pathOfTheFolder');
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
// RENDERING YOUR FILE USING TEMPLATING ENGINE

// route handler for the path 'domain/homePage'
app.get('/homePage',(request,response)=>{
    response.render('PathToTheFile');
})
//--------------------------------------------------------------------------------------------------------------------------

//Handler when there is an incoming request on the port
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})