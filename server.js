const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 8080;

//Connect to the Mongose.
connectDB();

app.get('/',(req,res)=> res.send("It's Working...") );


app.listen(PORT,()=> console.log(`Server starts on port ${PORT}`));