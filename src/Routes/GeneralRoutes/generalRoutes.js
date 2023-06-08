const Router = require("../../utility/Router");






/*********** Blogs Route *************/

const blogs = require("../../Controllers/General/general").gettingAllBlogs;
Router.get("/blog",blogs);


/*********** Adding Product Route Ends *************/




/*********** getOneBlogs Route *************/

const getOneBlog = require("../../Controllers/General/general").getOneBlog;
Router.get("/blog/:id",getOneBlog);


/*********** getOneBlogs Route Ends *************/














module.exports = Router;