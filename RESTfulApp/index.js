//-----------------------------------------------------------------------------------------------------
// Importing our required Modules:
// Express => is our backend framework.
// path => for using an absolute path for configuration rather than relative.
// method-override => help to deal with request other than GET or POST from a form.
const express = require('express');
const path = require('path');
const {Model} = require('./data.js')
const methodOverride = require('method-override');
const {AppError} = require('./utilities/AppError.js');
const wrapAsync = require('./utilities/wrapAsync.js');
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
app.get('/', wrapAsync(async (request,response)=>{
    const requestedSortingOrder = request.query.order === 'asc' ? 'asc' : 'dsc';
    const sortBy = requestedSortingOrder === 'asc' ? 1: -1;
    const blogs = await Model.find().sort({time:sortBy});
    const nextSortingOrder = requestedSortingOrder === 'asc' ? 'dsc' : 'asc'
     const buttonValue = requestedSortingOrder === 'asc' ? 'Newest to Oldest' :'Oldest to Newest'
    response.render('index.ejs',{data:blogs,nextSortingOrder:nextSortingOrder, buttonValue: buttonValue});
}))

app.get('/blog/new',(request,respone)=>{
    respone.render('createBlog.ejs');
})
app.post('/blog', wrapAsync(async (request,response)=>{
    const {title, author,article} = request.body;
    const newBlog = new Model({title: title,author:author,content:article,time:Date.now()})
    await newBlog.save()
    // as the name suggest it is basically redirects to the page which is given in the argument.
    // this is useful when say we do not necessaryly have a page to respond but rather we want to 
    // utilze an already existing route handler.
    response.redirect('/');
}))
app.get('/blog/:id', wrapAsync(async(request,response,next)=>{
    const idBlog= request.params.id;
    const blog = await Model.findOne({_id : idBlog})
    response.render('expandedPage.ejs',{data:blog});
}))
app.get('/blog/:id/edit',wrapAsync(async (request,response)=>{
    const id = (request.params.id).trim();
    const blog = await Model.findOne({_id:id});
    response.render('editBlog.ejs',{data:blog});
}))

app.patch('/blog/:id', wrapAsync(async (request,response)=>{
    const id = (request.params.id).trim();
    const {title, author,article } = request.body;
    const blog = await Model.findByIdAndUpdate(id,{$set:{title:title,author:author,content:article,time:Date.now()}});
    response.redirect('/');
    
}))
app.delete('/blog/:id',wrapAsync(async (request,response)=>{
    const id = (request.params.id).trim();
    await Model.findByIdAndDelete(id);
    response.redirect('/');
}))

app.all(/(.*)/,(req,res,next)=>{
    error.message = `Page ${req.path} not found `
    error.status = 404;
    next(error);
})
app.use((error,request,response,next)=>{
    response.render('error.ejs',{error:error})
    next();
    
})
app.listen(port,()=>{
    console.log("LISTENING ON PORT 8545...");
})
//-----------------------------------------------------------------------------------------------------
