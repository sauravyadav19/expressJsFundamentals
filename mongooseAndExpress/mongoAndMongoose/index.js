// Here we will learn mongoose in isolation with javascript
// then we we will integrate that with express
//--------------------------------------------------------------------------------------------------------
// PROCESS to setup mongoose
// 1. start your mongo service, which will generates your connection URL
// 2. connect your Mongo with Mongoose using that generated URL
//--------------------------------------------------------------------------------------------------------
// Step 1 => Importing Mongoose
const mongoose = require('mongoose');
//--------------------------------------------------------------------------------------------------------
// Step 2 => Connect Mongo and Moongose
// This is an asynchronous process meaning it does not hapeen right away.
// 'mongoose.connnec(URL)' returns a promise & hence we can use .then and .catch on it.
// Since this asynchronous process could result in an error (dmany reason, could be monog has not been started, refused conncection, wrong port.. etc)
// we need to handle it as well 

// The below approach will not work:

    // try{
    //     mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.6');
    //     console.log("CONNECTION WITH DATABASE HAS BEEN ESTABLISHED...")
    // }catch(error){
    //     console.log("CONNECTION WITH DATABASE FAILED");
    //     console.log(error);
    // }
//WHY? => becasue even when say conncetion fails, the message that will be displayed at first would be 
// "CONNECTION WITH DATABASE HAS BEEN ESTABLISHED...  because this synchronous line of code did not wait 
// for conncetion to result in an error or actual successful conncetion, it just move on to next line, whic
// was our message of conncetion establishment, but by the time error occured, the try-catch block was already
// finished running, leaving the error unhandled.

// SOLUTION
// well we know that mongoose.connect returns a promise, since its an asynchronous task
// we can use our understanding of .then and .catch to handle the conncetion properly.
// as a refresher .then block of code runs when the promise is successfully resolved 
// but if the promise is rejected the .catch parts runs.

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.6')
.then(()=>{
    console.log("CONNECTION WITH DATABASE HAS BEEN ESTABLISHED...")

})
.catch((error)=>{
    console.log("CONNECTION WITH DATABASE FAILED");
    console.log(error);
})
//--------------------------------------------------------------------------------------------------------


