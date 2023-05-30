const mongodb = require("mongoose");

mongodb.connect(process.env.DB_URL,{ useNewUrlParser: true }).then(()=>{
    console.log("DB IS CONNECTED");
}).catch((error)=>{
    console.log(error);
    //res.json({error});
});

module.exports = mongodb;