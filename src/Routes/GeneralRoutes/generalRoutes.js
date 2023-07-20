const Router = require("../../utility/Router");
const auth_Middleware = require("../../middlewares/authentication");





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






/*********** getOneProduct Route *************/

const getOneProduct = require("../../Controllers/General/general").getOneProduct;
Router.get("/product/:id",getOneProduct);


/*********** getOneProduct Route Ends *************/



/*********** getUser Route *************/

const getUser = require("../../Controllers/General/general").getUser;
Router.get("/userprofile",auth_Middleware,getUser);


/*********** getUser Route Ends *************/



/*********** getAllCategories Route *************/

const getAllCategories = require("../../Controllers/General/general").getAllCategories;
Router.get("/categories",getAllCategories);


/*********** getUser Route Ends *************/














module.exports = Router;