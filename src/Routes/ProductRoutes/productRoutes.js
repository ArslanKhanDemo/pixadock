const Router = require("../../utility/Router");
const productTypeChecker = require("../../middlewares/product/productTypeChecker");
const brandChecker = require("../../middlewares/product/brandChecker");
const multerMiddleware = require("../../middlewares/multer/multer");




/*********** Adding Product Route *************/
const approvedReviews = require("../../Controllers/Product/productController").approvedReviews;
Router.get("/product/reviews/:id",approvedReviews);

/*********** Adding Product Route Ends *************/




/*********** Adding Product type Route *************/
const addProductType = require("../../Controllers/Product/productController").addProductType;
Router.post("/product/addproducttype",productTypeChecker,addProductType);

/*********** Adding Product Type Route Ends *************/




/*********** deleteProductType Route *************/
const deleteProductType = require("../../Controllers/Product/productController").deleteProductType;
Router.delete("/product/deleteproducttype",deleteProductType);

/*********** deleteProductType Route Ends *************/




/*********** gettingProductTypes Route *************/
const gettingProductTypes = require("../../Controllers/Product/productController").gettingProductTypes;
Router.get("/product/gettingproducttypes",gettingProductTypes);

/*********** gettingProductTypes Route Ends *************/





/*********** addBrand Route *************/
const addBrand = require("../../Controllers/Product/productController").addBrand
Router.post("/product/addbrand",multerMiddleware.any(),brandChecker,addBrand);

/*********** addBrand Route Ends *************/


/*********** gettingBrand Route *************/
const gettingBrand = require("../../Controllers/Product/productController").gettingBrand;
Router.get("/product/brands",gettingBrand);

/*********** gettingBrand Route Ends *************/


/*********** userSearch Route *************/
const userSearch = require("../../Controllers/Product/productController").userSearch;
Router.get("/product/usersearch",userSearch);

/*********** userSearch Route Ends *************/







module.exports = Router;