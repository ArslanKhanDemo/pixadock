const blogsSchema = require("../../models/blogsSchema/blogsSchema");
const productSchema = require("../../models/productSchema/productSchema")
const response = require("../../utility/Response/response")




const check_ReqImageFile = async (req, res, next) => {
    try {
        console.log(req.files);
        if (req.files.length === 1) {
            console.log("Image provided");
            req.body.image = req.files[0].filename;
        }
        if (req.body.image === "") {
            console.log(req.body.image === "");
            console.log("Image Not Provided");
            let product = await productSchema.findById(req.params.id);
            req.body.image = product.image
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
        if (req.body.attribute === "" || req.body.attribute === undefined) {
            let product = await productSchema.findById(req.params.id);
            req.body.attributes = product.attributes
            console.log("attributes Not Provided");
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