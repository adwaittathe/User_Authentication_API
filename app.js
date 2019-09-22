const express=require('express');
const app=express();
const authRoutes = require( './routes/auth');
const mongoose = require('mongoose');
const dotenv= require('dotenv');
dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser:true , useUnifiedTopology: true } , ()=>{
        console.log('Connected to DB');
    } 
);

app.use(express.json());
app.use('/user',authRoutes);

app.listen(80, ()=> console.log('Server Up. Listening to port 80.........'));
 

