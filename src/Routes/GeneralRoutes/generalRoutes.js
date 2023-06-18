const Router = require("../../utility/Router");






/*********** Blogs Route *************/

const blogs = require("../../Controllers/General/general").gettingAllBlogs;
Router.get("/blog",blogs);

/*********** Blogs Route Ends *************/


/*********** Blogs Route *************/

const getspecificCatogoryProducts = require("../../Controllers/General/general").getspecificCatogoryProducts;
Router.get("/category/:id",getspecificCatogoryProducts);

/*********** Blogs Route Ends *************/




/*********** getOneBlogs Route *************/

const getOneBlog = require("../../Controllers/General/general").getOneBlog;
Router.get("/blog/:id",getOneBlog);


/*********** getOneBlogs Route Ends *************/














module.exports = Router;