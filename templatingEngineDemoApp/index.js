// importing our requried modules (express and path[for working with directory configuration])
const express = require('express');
const path = require('path');
const redditData = require('./data.json');
// creating an instance of our express app
const app = express();
//setting up the port
const port = 8545;

// setting up the templating engine
app.set('view engine','ejs');
// making sure 'views' is referenced from index.js relative directory 
app.set('views',path.join(__dirname,'/views'));
//----------------------------------------------------------------------------------------------------------
// SERVING A STATIC FILE IN EXPRESS

// this is how we serve css, js, html file in express
// app.use(express.static('public'))
// here we are using middleware (app.use()) (yet to learn), which run everytime since a request
// comes and a response is sent out
// express.static takes an argument of the name of the directory that we want to serve
// we can group all the files we want to serve in one diectory or we can serve each directory indiviual
// which would look like this:
    // app.use(express.static('public/css'))
    // app.use(express.static('public/js'))
    // app.use(express.static('public/html'))
// but with our current apporach
// our directory strcutue looks like this
    //Project Root Directory
    // public
        // css
        // js
        // html
    // views
    // index.js
// so we are serving the entire public directory, this keeps the app cohesive and well strctured,but earlier
// discussed apprach can also be used
// but we rn into the same issue as we did with '/view' directory of files becomes relative to where they ran from
// so to fix that we use path that is realtive to our index.js directory
// app.use(express.static('public)) would be changed to
app.use(express.static(path.join(__dirname,'public')))

//----------------------------------------------------------------------------------------------------------



// creating a route handler for path domainName/
app.get('/', (request,response)=>{
    response.render("home.ejs");
})
app.get('/search',(request,response)=>{
    const searchFor = request.query.searchFor;
     if(redditData[searchFor]){
        const data = redditData[searchFor];
        response.render('page.ejs',{page:searchFor, ...data});
    }else{
        response.render('404.ejs',{page:searchFor})
    }
})
app.get('/:subreddit',(request,response)=>{
    const subreddit = request.params.subreddit;
    // if there exist the data of the required subreddit in data.json we render our page.ejs 
    // wherein we are passing spreadding the variable 'data', which comes from our data.json file
    // so we can access it directly rather than doing data.title or data.post everytime
    // and if we do not have the clients requested subreddit page we simply are rendering the error 404 page
    if(redditData[subreddit]){
        const data = redditData[subreddit];
        response.render('page.ejs',{page:subreddit, ...data});
    }else{
        response.render('404.ejs',{page:subreddit})
    }
})


// listening on the specified port
app.listen(port,()=>{
    console.log("Listening on port 8545");
})

