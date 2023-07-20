const blogsSchema = require("../../models/blogsSchema/blogsSchema");
const productSchema = require("../../models/productSchema/productSchema");
const userSchema = require("../../models/userSchema/userSchema");
const response = require("../../utility/Response/response");
const categorySchema = require("../../models/categorySchema/categorySchema");


/*********** Getting All Blogs api Start *************/
const gettingAllBlogs = async (req, res) => {
    try {

        let blogs = await blogsSchema.find();
        if (blogs) {
            response(res, 200, {
                status: 200,
                result: blogs
            });
        } else {
            response(res, 404, {
                status: 404,
                result: "No BLOG found"
            });
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** Getting All Blogs api Ends *************/



/*********** Get One Blog api Start *************/
const getOneBlog = async (req, res) => {
    try {

        let blog = await blogsSchema.findById(req.params.id);
        if (blog) {
            response(res, 200, {
                status: 200,
                result: blog
            });
        } else {
            response(res, 404, {
                status: 404,
                result: "No BLOG found"
            });
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** Get One Blog api Ends *************/


/*********** Get specific catogory products api Start *************/
const getspecificCatogoryProducts = async (req, res) => {
    try {

        let find = await productSchema.find({ category: req.params.id });
        if (find) {
            response(res, 200, {
                status: 200,
                result: find
            });
        } else {
            response(res, 404, {
                status: 404,
                result: "No BLOG found"
            });
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** Get specific catogory products api Ends *************/



/*********** Get One product api Start *************/
const getOneProduct = async (req, res) => {
    try {

        let product = await productSchema.findById(req.params.id);
        if (product) {
            response(res, 200, {
                status: 200,
                result: product
            });
        } else {
            response(res, 404, {
                status: 404,
                result: "No product found"
            });
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** Get One product api Ends *************/




/*********** Get user profile api Ends *************/

const getUser = async (req, res) => {
    try {
        try {
            let record = await userSchema.findOne(
                { _id: process.env.USER_ID }
            );
            response(res, 201, record);
        } catch (error) {
            console.log(error.message);
            response(res, 500, error.message);
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** Get user profile api Ends *************/

/*********** getAllCategories api Ends *************/

const getAllCategories = async (req, res) => {

    try {
        let categories = await categorySchema.find();
        console.log(categories);
        if (categories) {
            response(res, 201, categories);
        } else {
            response(res, 404, "No result");
        }
    } catch (error) {
        console.log(error.message);
        response(res, 500, error.message);
    }

}
/*********** getAllCategories api Ends *************/


module.exports = {
    gettingAllBlogs,
    getOneBlog,
    getspecificCatogoryProducts,
    getOneProduct,
    getUser,
    getAllCategories
}