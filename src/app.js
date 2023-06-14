const express = require('express');
const helmet = require("helmet");
const app = express();



require("dotenv").config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "Local Host";










// Parse JSON bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));



/***************** Helmet *************/
app.use(helmet());



/************** * Cors ***********/
const cors = require("cors");
app.use(cors());
//app.use(cors("Access-Control-Allow-Origin: *"));




/**************** * Routes_ *************/
require("./Routes/routes")(app);



/**************** * DB_ *************/
require("./db/mongoDB/mongodb");



app.listen(PORT,()=>{
    console.log(`Server is connected to ${HOST} on PORT:${PORT}`);
});



























//app.use('/api',require("./Routes/routes")(app));
//app.use(express.static('uploads'));
// /******************* * boss's code for parser ***********************/
// const { fileParser } = require('express-multipart-file-parser');
// app.use(
//     fileParser({
//       rawBodyOptions: {
//         limit: '30mb', //file size limit
//       },
//       busboyOptions: {
//         limits: {
//           fields: 50, //Number text fields allowed
//         },
//       },
//     })
//   );
// /*******************    *************************/
