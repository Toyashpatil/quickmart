const express = require("express");
const app = express();
const passport=require('passport')
const session = require('express-session');
require('dotenv').config();
const connectTOMongo= require('./db');
const cors = require("cors");
require('./passport')

app.use(express.json());
app.use(cors());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());



const PORT =5000;

connectTOMongo();

app.use('/auth',require('./routes/auth'));
app.use('/product',require('./routes/product'));
app.use('/cart',require('./routes/Cart'));
app.use('/payment',require('./routes/razorpay'));
app.use('/order',require('./routes/order'));






app.get('/', (req, res) => {
    res.send('<a href="auth/google" >Authenticate with Google</a>')
})
// app.get('/getIp',(req,res)=>{
//     const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     console.log(ip);
//     res.json({
//         ip:ip
//     })
// })

app.listen(PORT,()=>{
    console.log("Server started PORT : " + PORT);
})