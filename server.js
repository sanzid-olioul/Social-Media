const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/',(req,res)=> res.send("It's Working...") );


app.listen(PORT,()=> console.log(`Server starts on port ${PORT}`));