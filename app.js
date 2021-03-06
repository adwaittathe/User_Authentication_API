const express=require('express');
const app=express();
const authRoutes = require( './routes/auth');
const paymentRoutes = require( './routes/paymentRoutes');
const storeRoutes = require( './routes/store');
const scopingRoutes = require( './routes/scopingProject');
const mongoose = require('mongoose');
const dotenv= require('dotenv');
dotenv.config();
mongoose.set('useFindAndModify', false);

mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser:true , useUnifiedTopology: true } , ()=>{
        console.log('Connected to DB');
    } 
);

app.use(express.json());
app.use('/api/user',authRoutes);
app.use('/api/payments',paymentRoutes);
app.use('/api/store',storeRoutes);
app.use('/api/scoping',scopingRoutes);

app.listen(80, ()=> console.log('Server Up. Listening to port 80.........'));
 

