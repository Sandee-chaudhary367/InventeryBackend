const mongoose = require('mongoose')

//setup to connect to the database
let url=    "mongodb+srv://sandeepchaudhary:NewCommer13@cluster0.abp9usm.mongodb.net/Cluster0?retryWrites=true&w=majority"
// mongoose.connect('mongodb://127.0.0.1:27017/Inventory2', {
    mongoose.connect(url, {
    useNewUrlParser: true,
//  useCreateIndex: true,  cause error - Operation `users.insertOne()` buffering timed out after 10000ms
    useUnifiedTopology: true
},()=>{console.log("Server started")})

