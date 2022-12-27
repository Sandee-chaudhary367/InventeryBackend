const express = require("express");
require('./db/mongoose')
userRoutes=require("./routes/user_routes")
articleRoutes=require("./routes/article_routes")
const cors = require("cors");
const app = express();
const { db } = require("./models/user");
var corsOptions = {
    origin: "http://localhost:3000"
}
app.use(express.json());
app.use(cors(corsOptions));
app.use(userRoutes);
app.use(articleRoutes);

app.get("/",(req,res)=> res.send("Hii"))

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
