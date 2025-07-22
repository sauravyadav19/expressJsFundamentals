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
    //we are now using response.render rather than response.send() as the file we are sending need to be render first 
    // then only will be sent the client,so rendering is happening at server side rather than client side.
    // the Path need not to mention /view/NameOfTheFile since express assuems that it will be in views, we can simply
    // just write the name of the file, also we do not have to add the .ejs extension because the rending engine already
    // been set to 'ejs' so express knows that it is a .ejs file but its a good practice and gives more clarity if we add the extension
})
//--------------------------------------------------------------------------------------------------------------------------

//Handler when there is an incoming request on the port
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})