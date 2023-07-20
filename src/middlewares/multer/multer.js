const multer = require('multer');
const path = require("path");
const fs = require('fs');

var Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let uploadPath = path.join(__dirname, "../../../../../react/my-app/public/uploads/");
        try {
            //console.log("req,from multer",req);
            fs.mkdirSync(uploadPath, { recursive: true });
            //console.log("req.body from multer: ", req.body);
            callback(null, uploadPath);
        } catch (err) {
            callback(err); // Pass the error to multer
        }
    },
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        callback(null, uniqueName);
    }
});

var upload = multer({ storage: Storage });

module.exports = upload;
