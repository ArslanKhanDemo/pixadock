// const multer = require('multer');
// const path = require("path");

// console.log("Multer Starts");
// var Storage = multer.diskStorage({
//     destination: (req, file, callback) => {
        
//         console.log("req.body from multer: ",req.body);
//         callback(null, "uploads");
        
//     },
//     filename: (req, file, callback) => {
        
//         const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
//         callback(null, uniqueName);
        
//     }
// });
// console.log("Multer Ends");

// var upload = multer({ storage: Storage });

// module.exports = upload;

//////////////////////////////////

//require("../../../../../react/my-app/public/uploads/");

const multer = require('multer');
const path = require("path");
const fs = require('fs');

console.log("Multer Starts");
var Storage = multer.diskStorage({
    destination: (req, file, callback) => {

        let uploadPath = path.join(__dirname, "../../../../../react/my-app/public/uploads/"); // Use path.join() for cross-platform compatibility
        fs.mkdirSync(uploadPath, { recursive: true }); // Create the directory if it doesn't exist
        console.log("req.body from multer: ", req.body);
        callback(null, uploadPath);

    },
    filename: (req, file, callback) => {

        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        callback(null, uniqueName);

    }
});
console.log("Multer Ends");

var upload = multer({ storage: Storage });

module.exports = upload;