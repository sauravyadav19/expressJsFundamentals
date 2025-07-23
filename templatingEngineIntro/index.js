const express = require('express'); // importing express
const path = require('path');
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
app.set('views',path.join(__dirname, '/views')); 
//here we are asking to take the current file's directory (index.js) and add /views to it to get the views directory
// so something like this would have happen 
// templatingEngineIntro[index.js directory] + '/views'[what we are asking to join]
//(refer to the RENDERING YOUR FILE USING TEMPLATING ENGINE for detaile explanation )
//--------------------------------------------------------------------------------------------------------------------------
// RENDERING YOUR FILE USING TEMPLATING ENGINE

// route handler for the path 'domain/homePage'
app.get('/homePage',(request,response)=>{
    response.render('homepage.ejs',{variableName:'value of the Variable'});
    //we are now using response.render rather than response.send() as the file we are sending need to be render first 
    // then only will be sent the client,so rendering is happening at server side rather than client side.
    // the second argument of the respone.render() is variables that we want to pass to the .ejs file, with first value
    // being the name of variable and the second value being the value of that variable.
    // the Path need not to mention /view/NameOfTheFile since express assuems that it will be in views, we can simply
    // just write the name of the file, also we do not have to add the .ejs extension because the rending engine already
    // been set to 'ejs' so express knows that it is a .ejs file but its a good practice and gives more clarity if we add the extension.
    // there is also a catch for this default behaviour of express assuming the 'views' folder, it is fine when we 
    // run our project from the folder that has the our view folder, as it just take our current path and append /views 
    // at the end to access it, but if we were to change the place we are running our index.js file, it will concatnate 
    // from that file (process.cwd() + /views ) and this will lead to error.
    // so if want to make sure that our app can run from anywhere (doing "node index.js"), we have to make sure 
    // that path of /views is properly configured.To do that we use the "path" library, that allows us to deal
    // with paths in javascript,so we have to "require" it.
    // then we can configure our express app in such a way that instead of taking the path of the current directory and the
    // concatanating '/view' to find views directory (default behaviour) to configuring it so that it finds views
    //directory relative to where our index.js is.

})
//--------------------------------------------------------------------------------------------------------------------------

//Handler when there is an incoming request on the port
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})