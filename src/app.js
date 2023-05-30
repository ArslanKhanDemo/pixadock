const express = require('express');
const app = express();
require("dotenv").config();
let PORT = process.env.PORT || 3000;
let HOST = process.env.HOST || "Local Host";

const bodyParser = require('body-parser');
// Parse JSON bodies
app.use(bodyParser.json());

//app.use('/api',require("./Routes/routes")(app));
require("./Routes/routes")(app);
require("./db/mongoDB/mongodb");
   
app.listen(PORT,()=>{
    console.log(`Server is connected to ${HOST} on PORT:${PORT}`);
});