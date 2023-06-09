const blogsSchema = require("../../models/blogsSchema/blogsSchema");
//const productSchema = require("../../models/productSchema/productSchema")
const response = require("../../utility/Response/response")




const check_blogUpdation = async (req, res, next) => {
    try {
        console.log(req.files);
        if (req.files.length === 1) {
            console.log("Image provided");
            req.body.image = req.files[0].filename;
        }
        if (req.body.heading === "") {
            console.log(req.body.heading === "");
            let blog = await blogsSchema.findById(req.params.id);
            req.body.heading = blog.heading
            console.log("heading Not Provided");
        }
        if (req.body.image === "") {
            console.log(req.body.image === "");
            let product = await blogsSchema.findById(req.params.id);
            req.body.image = product.image
            console.log("Image Not Provided");
        }
        if (req.body.content === "") {
            console.log(req.body.content === "");
            let blog = await blogsSchema.findById(req.params.id);
            req.body.content = blog.content
            console.log("content Not Provided");
        }
        next();

    } catch (error) {
        response(res, 500, {
            status: 500,
            result: "From check_blogUpdation catch: " + error.message,
        });
    }
}



module.exports = check_blogUpdation;