const Router = require("../../utility/Router");
const tokenMiddleware = require("../../middlewares/authentication");

/*********** Adding Product Route *************/
const approvedReviews = require("../../Controllers/Product/productController").approvedReviews;
Router.get("/product/reviews/:id",approvedReviews);


/*********** Adding Product Route Ends *************/














module.exports = Router;