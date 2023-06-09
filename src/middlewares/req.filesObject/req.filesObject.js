const blogsSchema = require("../../models/blogsSchema/blogsSchema");
const productSchema = require("../../models/productSchema/productSchema")
const response = require("../../utility/Response/response")




const check_ReqImageFile = async (req, res, next) => {
    try {

        // console.log("req.body check_REQ INITIAL: ",req.body);
        // console.log(req.hasOwnProperty('files'));// if you send image with multer, then there will be 
        // // an object called "files" in req.files (array type)
        // if (req.hasOwnProperty('files') === true) {
        //     if (req.files.length === 1) {
        //         console.log("In IF");
        //         console.log("image Provided");
        //         req.body.image = req.files[0].filename;
        //         next();

        //     } else {
        //         let product = await productSchema.findById(req.params.id);
        //         let blog = await blogsSchema.findById(req.params.id);
        //         if (product) {

        //             req.body.category = req.body.category || product.category;
        //             req.body.name = req.body.name || product.name;
        //             req.body.price = req.body.price || product.price;
        //             req.body.image = req.body.image || product.image;
        //             console.log(req.body);
        //             next();
        //         } else if(blog){

        //             console.log(blog.image);
        //             req.body.heading = req.body.heading || blog.heading;
        //             req.body.image = req.body.image || blog.image;
        //             req.body.content = req.body.content || blog.content;
        //             console.log(req.body);
        //             next();
        //         }
        //     }
        // } else if (req.hasOwnProperty('files') === false) {
        //     console.log("In ELSE-IF");
        //     console.log("Not Present");
        //     console.log(req.body);
        //     next();
        // }
        console.log(req.files);
        if (req.files.length === 1) {
            console.log("Image provided");
            //let product = await productSchema.findById(req.params.id);
            req.body.image = req.files[0].filename;
        }
        //console.log("req.body.image:",req.body.image === "");
        if (req.body.image === "") {
            console.log(req.body.image === "");
            let product = await productSchema.findById(req.params.id);
            req.body.image = product.image
            console.log("Image Not Provided");
        }
        if (req.body.category === "") {
            console.log(req.body.category === "");
            let product = await productSchema.findById(req.params.id);
            req.body.category = product.category
            console.log("category Not Provided");
        }
        if (req.body.name === "") {
            console.log(req.body.name === "");
            let product = await productSchema.findById(req.params.id);
            req.body.name = product.name
            console.log("name Not Provided");
        }
        if (req.body.price === "") {
            console.log(req.body.price === "");
            let product = await productSchema.findById(req.params.id);
            req.body.price = product.price
            console.log("price Not Provided");
        }
        next();

    } catch (error) {
        response(res, 500, {
            status: 500,
            result: "From check_ReqImageFile catch: " + error.message,
        });
    }
}



module.exports = check_ReqImageFile