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

// a small catch to this => we could have used await-async in our try -catch block and it would have worked fine
// same as .then and .catch, infact it is used widely used in production level code, as it easier to read and debug.
// Async and Await way of doing same thing would be this:
    //(async () => {
    //   try {
    //     await mongoose.connect('mongodb://127.0.0.1:27017/myTodoApp');
    //     console.log("CONNECTION WITH DATABASE HAS BEEN ESTABLISHED...");
    //   } catch (error) {
    //     console.log("CONNECTION WITH DATABASE FAILED");
    //     console.log(error);
    //   }
    // })();

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.6')
.then(()=>{
    console.log("CONNECTION WITH DATABASE HAS BEEN ESTABLISHED...")

})
.catch((error)=>{
    console.log("CONNECTION WITH DATABASE FAILED");
    console.log(error);
})

//about the mongo's generated URL
// mongodb://127.0.0.1:27017/myTodoApp
// \______/ \____________/ \________/
//   |           |             |
// Protocol     Server      Database Name
//              Address


//if we want to use different database, we just want to specify that database's name
// in case no database is specified, mongo defaults to 'test' database
// if your specified database does not exist, mongo creates one.
//--------------------------------------------------------------------------------------------------------
//SCHEMA and MODEL

//WHAT IS A MOGOOSE SCHEMA?
// it is a blueprint of what would be strcture of our data be like (in Relational database, we call it the table)
//Analogy : Blueprint of a house, it not the actual house, but this is required to build the actual house.
const movieSchema = mongoose.Schema({
    title: String,
    score: Number,
    rating: String,
    year: Number
})
// using the above defined mogoose schema Mongo will know what are "columns" and what kind of datatype value to expect in it


//WHAT IS A MOGOOSE MODEl?
//if Schmea is the blueprint, Model is the Factory that take that blueprint and creates the house for us using that blueprint
// using mogoose model, we get an interface to the database to do all our operation(CRUD).

// How to Create a Mongoose Model:

// we use mongoose.model() which takes two required parameters:
// 1. NAME OF THE MODEL, using this name, on the mongoDB side a collection would be created;conventionally 
//    the first letter of the name should be capatalized; mongoose internally pluralizes this name (it just
//    do not add an 's' at the end rather it handle it in an sophisticated manner (Person => people)) to name
//    the collection that would be created by mongoDB.
//    if we do not want to rely on mogoose for the naming of our mongoDB collection we can specify what name 
//    we want to give to that collection as the third argument to mongoose.model().
// 2. SCHEMA, the model take the schema using which the data would be store in the created collection.
// So, in the below lines of code:
// the first argument 'Movie' is the name of the model using which a collection of the name 'movies'
// would be created and the schema it would be assocaiated with would be movieSchema
const Movie = mongoose.model('Movie', movieSchema);
// 3. NAME OF THE COLLECTION (OPTIONAL)
// say we do not want to rely on mogoose for the naming of our collection that will be created by mongoDB
// but rather we want to give a custom Name, that custom name is the third optional argument and code would look like this:
// const Movie = mongoose.model('Movie', movieSchema, movieCollection)
// so now instead of resorting to the default way of naming (pluralzing, using the first argument),mogoose
// instructs mongoDB to create a collection with our custom name instead.

//It might look like that with exection of mongoose.model() line, mongoDB will create a collection,but
// that technially not accurate, mongoDB register that request for creation of the collection but
// it does not create the actuall collection unitl either a value has been insterted or we have explictly
// not asked it to do it by calling ModelName.createCollection();

//--------------------------------------------------------------------------------------------------------
// DOING CRUD (create,read,update delete) operations using mour MODEL

// 1. Creation (Add data to the database)
// if we were to compare with SQL databases the row of the table there is caled document here,
// meaning now we will be inserting dcoument to our schema using the mogoose model.

// there are two Methods which we can do this:
// Method 1: Creating an in-memory instance of the model and then saving it
// Method 2: inserting using modelName.insertMany() 

// Method 1:

// Step 1:  Creating an instance of the Movie Model
// const theMenu = new Movie ({
//     title: 'The Menu',
//     score: 7.9,
//     rating: 'R',
//     year: 2022
// })

// Step 2: Then saving that instance of our model to our mongoDB
// theMenu.save();


// Method 2:

// const topRatedMovies = [
//     {title: 'Interstellar', score:9.3, rating: 'PG-13', year:2012},
//     {title: 'Get out', score:9.1, rating: 'R', year:2016},
//     {title: 'Inception', score:8.9, rating: 'G', year:2018},
// ]

// Movie.insertMany(topRatedMovies);


// these methods the way coded above are not the best practice
// because every task that involes interaction with database is asynchronous
// Both .save() and .insertMany() are asynchronous, so they return promises.
// You CAN use them directly, but you should always handle them with either `.then().catch()`
// or, preferably, with `await` inside an async function to ensure proper flow and error handling.
// so the correct way would have been:

async function insertSingleMovie() {
    const theMenu = new Movie ({
        title: 'The Menu',
        score: 7.9,
        rating: 'R',
        year: 2022
    })
    
    await theMenu.save()
}
insertSingleMovie();

async function insertMoreThanOneMovie(){
    const topRatedMovies = [
        {title: 'Interstellar', score:9.3, rating: 'PG-13', year:2012},
        {title: 'Get out', score:9.1, rating: 'R', year:2016},
        {title: 'Inception', score:8.9, rating: 'G', year:2018},
    ]

   await  Movie.insertMany(topRatedMovies);
}
insertMoreThanOneMovie();