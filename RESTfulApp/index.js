//-----------------------------------------------------------------------------------------------------
// Importing our required Modules:
// Express => is our backend framework.
// path => for using an absolute path for configuration rather than relative.
// method-override => help to deal with request other than GET or POST from a form.
const express = require('express');
const path = require('path');
let { blogs, uuid } = require('./data');
const methodOverride = require('method-override');
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
// when we have a form in html we can only specify the METHOD to be either GET or POST
// but if we want to use PATCH, PUT or DELETE, we have to trick the form in sending that 
// kind of the request, for theat we have library call methodOverride, we allow us to do somethign like this
// <form action = '/blog/<%=data.id%>?_method=PATCH' method="POST" >
// here even thought the METHOD is set to POST we have created a hidden value in the action _method="PATCH"
// and since every incoming request has to go through the middleware, this middleware where we using methodOverrid
// will trick our server into thinking that we are getting a PATCH request even though it is a POST request 
// that was originally made.
app.use(methodOverride('_method'));
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
app.get('/blog/:id/edit',(request,response)=>{
    const id = (request.params.id).trim();
    for(let blog of blogs){
        if(blog.id === id){
            response.render('editBlog.ejs',{data:blog});
            break;
        }
    }
})

app.patch('/blog/:id',(request,response)=>{
    const id = (request.params.id).trim();
    const {title, author,article } = request.body;
    for(let blog of blogs){
        if(blog.id === id){
            blog.title = title;
            blog.author = author;
            blog.content = article;
            response.redirect('/');
        }
    }
})
app.delete('/blog/:id',(request,response)=>{
    console.log("You are inside the DELETE REQUESt");
    const id = (request.params.id).trim();
    let newBlog = [];
    for(let blog of blogs){
        if(blog.id !== id){
            newBlog.push(blog)
        }
    }
    blogs = newBlog;
    response.redirect('/');
})
app.listen(port,()=>{
    console.log("LISTENING ON PORT 8545...");
})
//-----------------------------------------------------------------------------------------------------
