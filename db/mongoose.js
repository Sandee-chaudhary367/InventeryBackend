const mongoose = require('mongoose')

//setup to connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/Inventory2', {
    useNewUrlParser: true,
//  useCreateIndex: true,  cause error - Operation `users.insertOne()` buffering timed out after 10000ms
    useUnifiedTopology: true
},()=>{console.log("Server started")})

