const express = require('express');
const app = express();
require("dotenv").config();
let PORT = process.env.PORT || 3000;
let HOST = process.env.HOST || "Local Host";


   



app.listen(PORT,()=>{
    console.log(`Server is connected to ${HOST} on PORT:${PORT}`);
})