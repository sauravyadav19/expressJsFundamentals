//-----------------------------------------------------------------------------------------------------
// Importing our required Modules:
// Express => is our backend framework.
// path => for using an absolute path for configuration rather than relative.
const express = require('express');
const path = require('path');
let { blogs, uuid } = require('./data');
//-----------------------------------------------------------------------------------------------------
//Creating an Instance our Express app:
const app = express();
//-----------------------------------------------------------------------------------------------------
// Properties that need Configuration:
// Port on which server is listening for incoming Request
const port = 8545;
//Setting up the Templating Engine
app.set('view engine', 'ejs');
// Setting up a absoulte Path of '/views' directory
app.set('views', path.join(__dirname,'/views'));
//Serving files (stored in root-Directory/public directory)
app.use(express.static(path.join(__dirname,'public')));
// When we send data using form and that data is not in url (as in a post request ) rather in body
// we need to tell express so it can decoded it 
// this is also true for JSON file sent for that we need to use  'app.use(express.json())'
app.use(express.urlencoded())
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//Route Handlers
app.get('/',(request,response)=>{
    response.render('index.ejs',{data:blogs});
})
app.get('/blog/new',(request,respone)=>{
    respone.render('createBlog.ejs');
})
app.post('/blog', (request,response)=>{
    const {title, author,article} = request.body;
    let newArticle  = {"title":title, "author":author, "content":article, id:uuid()};
    blogs.push(newArticle);
    // as the name suggest it is basically redirects to the page which is given in the argument.
    // this is useful when say we do not necessaryly have a page to respond but rather we want to 
    // utilze an already existing route handler.
    response.redirect('/');
})
app.get('/blog/:id',(request,response)=>{
    const id = request.params.id;
    for(let blog of blogs){
        if(blog.id === id){
            response.render('expandedPage.ejs',{data:blog});
        }
    }
    

})
app.listen(port,()=>{
    console.log("LISTENING ON PORT 8545...");
})
//-----------------------------------------------------------------------------------------------------
