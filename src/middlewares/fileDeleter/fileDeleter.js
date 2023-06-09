const fs = require('fs');
const response = require('../../utility/Response/response');
//const fs = require('../../uploads/');

process.env.FILE_NAME = "1686232425000-111713388.png"
let fileName = process.env.FILE_NAME;


//let fileName = process.env.FILE_NAME;











const fileDeleter = async (req, res) => {

    try {
        const filePath = `${process.env.UPLOAD_PATH}/${fileName}`;

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(err);
                response(res, 201, err)
            } else {

                console.log('File deleted successfully');
                response(res, 201, 'File deleted successfully')
            }

        });

    } catch (error) {
        response(res, 500, error.message)
    }

}

module.exports = fileDeleter;