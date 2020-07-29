const express = require('express');
const connectDB = require('./config/db');

const app = express();

const PORT = process.env.PORT || 8080;

//Connect to the Mongose.
connectDB();

app.get('/',(req,res)=> res.send("It's Working...") );

// Init Middleware
app.use(express.json({ extended : false}));


// Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));


app.listen(PORT,()=> console.log(`Server starts on port ${PORT}`));