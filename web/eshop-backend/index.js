require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')



let userRouter = require('./route/userRoute')
let categRouter = require('./route/categoryRoute')
let prodRouter = require('./route/productRoute')
let cartRouter = require('./route/cartRoute')
let contactRouter = require('./route/contactRoute')
let app = express();






app.use(cors());

app.all("/*", function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
 mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connected to Database')
        app.listen(4080, () => {
            console.log("You're listening to port 4080")
            
        })
});


app.use(userRouter)
app.use(categRouter)
app.use(prodRouter)
app.use(cartRouter)
app.use(contactRouter)