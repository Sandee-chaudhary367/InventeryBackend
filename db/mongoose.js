const mongoose = require('mongoose')
require('dotenv').config()
//setup to connect to the database
let url= process.env.CONNECT_STRING
// mongoose.connect('mongodb://127.0.0.1:27017/Inventory2', {
    mongoose.connect(url, {
    useNewUrlParser: true,
//  useCreateIndex: true,  cause error - Operation `users.insertOne()` buffering timed out after 10000ms
    useUnifiedTopology: true
},()=>{console.log("Server started")})

