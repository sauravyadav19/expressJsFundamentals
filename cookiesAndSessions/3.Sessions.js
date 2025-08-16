const express = require('express');
const session = require('express-session');
const path = require('path')

const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'/views'))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:'thisIsTheSecretPhrase',
    resave: false,            // avoid unnecessary session saving
    saveUninitialized: false, // don't save empty sessions
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days in milliseconds
        httpOnly: true,  
        secure: false     // set to true if using HTTPS
    }
}))

app.get('/', (request,response)=>{
    if(request.session.username){
        response.redirect('/loggedin')
    }
    else{
        response.redirect('/Login')
    }
})
app.get('/Login',(request,response)=>{
    response.render('loginForm.ejs');
})
app.post('/SignIn',(request,response)=>{
    //storing the username in with session
    const {username,password} = request.body
    request.session.username = username;
    response.redirect('/loggedIn');
})
app.get('/loggedIn',(request,response)=>{
    response.render('loggedIn.ejs',{username:request.session.username});
    
})
app.post('/logout', (request,response)=>{
    // Removing the session cookie from user's browser
    request.session.username =null;
    response.redirect('/Login');
})

app.listen(8545,()=>{
    console.log("listening on port 8545");
})
