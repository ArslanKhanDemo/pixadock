const mongodb = require("mongoose");

try {
    (function () {
        mongodb.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => {
            console.log("DB IS CONNECTED");
        }).catch((error) => {
            console.log("DB Message:",error.message);
        });
    })();
} catch (error) {
    res.status(500).json({ error: error });
}
module.exports = mongodb;