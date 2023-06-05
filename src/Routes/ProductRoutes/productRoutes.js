const Router = require("../../utility/Router");
const tokenMiddleware = require("../../middlewares/authentication");

/*********** Adding Product Route *************/
const addProduct = require("../../Controllers/Product/product").addProduct;
Router.post("/product/add",tokenMiddleware,addProduct);


/*********** Adding Product Route Ends *************/














module.exports = Router;