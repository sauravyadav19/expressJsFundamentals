let SeedData = [
    {
        title: "Why Infinity Isn’t a Number",
        author: "Ada Lovelace",
        content: `Infinity isn't a number you can reach—it's a concept that expresses the idea of something without any bound. 
It often appears in mathematics through limits, calculus, and set theory. For example, the number of points 
on a line is infinite, yet each point can be uniquely identified.

Understanding infinity is crucial in fields like analysis, where it helps describe behavior as quantities grow 
larger and larger, or get arbitrarily close to zero. Just don't try to treat it like an ordinary number—adding 
or subtracting infinity leads to undefined outcomes.`,
        time: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
    },
    {
        title: "The Elegance of Euler’s Identity",
        author: "Leonhard Euler",
        content: `Euler’s Identity: e^(iπ) + 1 = 0, is often considered the most beautiful equation in mathematics. 
Why? Because it links five of the most fundamental constants—e, i, π, 1, and 0—into one elegant formula.

This identity bridges complex numbers, exponential growth, and trigonometry. It's not just a mathematical 
curiosity—it plays a central role in quantum mechanics, signal processing, and electrical engineering. 
It’s the kind of math that feels more like poetry.`,
        time: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
    },
    {
        title: "Time Dilation: A Window into Relativity",
        author: "Albert Einstein",
        content: `Time dilation is one of the most counterintuitive yet fascinating consequences of Einstein’s 
special theory of relativity. According to this theory, time doesn’t tick at the same rate for everyone—it 
slows down for objects moving at speeds close to that of light.

This isn’t just theory. It’s been confirmed using high-precision atomic clocks on GPS satellites, which 
must account for this effect to remain accurate. At its core, time dilation reshapes our understanding of 
reality: time is not absolute.`,
        time: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
    },
    {
        title: "Why CPUs Can't Keep Getting Faster",
        author: "Grace Hopper",
        content: `In the early 2000s, CPUs got faster every year. But now, we're hitting physical limits. 
When processors get too small and fast, they generate more heat than we can dissipate and run into quantum 
instability.

To solve this, the industry shifted to parallel computing—adding multiple cores and leveraging GPUs 
and distributed systems. That’s why understanding concurrency and multithreading is essential today—hardware 
alone can’t carry us forward anymore.`,
        time: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
    },
    {
        title: "Blockchain: Trust Without Middlemen",
        author: "Satoshi Nakamoto",
        content: `Blockchain is more than cryptocurrency—it's a new way to build trust without centralized 
authorities. Instead of relying on a bank or a government, a blockchain uses cryptographic proof and 
distributed consensus to verify transactions.

Each block contains a cryptographic hash of the previous one, making tampering almost impossible. 
From supply chains to voting systems, blockchain’s transparency and immutability make it a powerful tool 
for building trust in a digital world.`,
        time: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
    },
    {
        title: "Fourier Transforms: Seeing Signals Differently",
        author: "Joseph Fourier",
        content: `The Fourier Transform takes a time-based signal—like sound or a digital image—and decomposes 
it into its frequency components. This allows engineers and scientists to 'see' what frequencies exist in 
a complex signal.

Applications are everywhere: MP3 compression, JPEG image processing, solving differential equations, and 
even quantum mechanics. It’s one of the most powerful tools for understanding waveforms and systems.`,
        time: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
    },
    {
        title: "The Butterfly Effect in Chaos Theory",
        author: "Edward Lorenz",
        content: `In chaotic systems, tiny changes in starting conditions can lead to vastly different outcomes. 
This is known as the Butterfly Effect—where a butterfly flapping its wings could influence a tornado 
weeks later.

This concept has deep implications in weather forecasting, biology, economics, and beyond. It reminds us that 
predicting the future in such systems isn’t about precision—it’s about understanding patterns in unpredictability.`,
        time: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
    },
    {
        title: "P vs NP: The Greatest Open Problem in CS",
        author: "Stephen Cook",
        content: `In computer science, P vs NP asks: If a solution to a problem can be verified quickly, 
can it also be found quickly?

This problem impacts cryptography, optimization, AI, and more. If P = NP, then every problem we can verify 
quickly (like solving a Sudoku puzzle) can also be solved just as fast. If not, many things we do today 
depend on problems staying hard—like encryption. Solving this question could change everything.`,
        time: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
    }
];

//Connecting to Database

const mongoose = require('mongoose');
async function connectToDB(){
    try{

        await mongoose.connect('mongodb://127.0.0.1:27017/blog',{
             serverSelectionTimeoutMS: 2000
        });
        console.log('Connection with Databse has been established..');

    }catch(error){

        console.log("---ERROR OCCURED WHILE CONNECTING WITH DATABAS---");
        console.log(error);
    }
}
connectToDB();

//Creating the Schema

const schema = mongoose.Schema({
    title: String,
    author: String,
    content: String,
    time: Date
})

//Creating a Model

const Model = mongoose.model('Blog',schema);

// Inserting the Seed Data Once
// Model.insertMany(SeedData);

// Exporting the Model
module.exports = {Model};