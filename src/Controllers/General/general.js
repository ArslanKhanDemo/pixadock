const blogsSchema = require("../../models/blogsSchema/blogsSchema");
const response = require("../../utility/Response/response");



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





module.exports = {
    gettingAllBlogs,
    getOneBlog
}