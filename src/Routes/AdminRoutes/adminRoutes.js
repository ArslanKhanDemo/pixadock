const Router = require("../../utility/Router");


const joi_Middleware = require("../../middlewares/User/joi/joi");
const hash_password = require("../../middlewares/User/hashPassword/hashPassword");
const unique_User = require("../../middlewares/User/uniqueUser/uniqueUser");
const find = require("../../middlewares/User/find/find");
const sessionCreation = require("../../middlewares/sessionCreation/sessionCreation");
const auth_Middleware = require("../../middlewares/authentication");
const authorizeUpdation = require("../../middlewares/User/authorizeUpdation/authorizeUpdation");
const verifyAdmin = require("../../middlewares/Admin/verifyAdmin");
const multerMiddleware = require("../../middlewares/multer/multer");
const check_ReqImageFile = require("../../middlewares/req.filesObject/req.filesObject");
const check_blogUpdation = require("../../middlewares/req.fileObjectforBlogs/blogUpdateVerifier");
const fileDeleter = require("../../middlewares/fileDeleter/fileDeleter");
const attributeChecker = require("../../middlewares/product/attributeChecker");





/*********** Registration Route *************/
const registration = require("../../Controllers/Admin/adminController").registration;
Router.post("/admin/registration",joi_Middleware,hash_password,unique_User,registration);


/*********** Login Route *************/
const Login = require("../../Controllers/Admin/adminController").Login;
Router.post("/admin/login",find,sessionCreation,Login);

/*********** Update Route  *************/

const Update = require("../../Controllers/Admin/adminController").Update;
Router.patch("/admin/update",auth_Middleware,authorizeUpdation,hash_password,Update)


/*********** LogOut Route  *************/

const logOut = require("../../Controllers/Admin/adminController").logOut;
Router.delete("/logout",auth_Middleware,logOut);



/*********** numberVerification Route  *************/

const sendCode = require("../../Controllers/Admin/adminController").sendCode;
Router.post("/admin/sendcode",auth_Middleware,sendCode);



/*********** verification_Code_Submit Route  *************/

const verification_Code_Submit = require("../../Controllers/Admin/adminController").verification_Code_Submit;
Router.post("/admin/codesubmit",auth_Middleware,verification_Code_Submit);







/*************  ****************************************************************************/






/*********** Add Product Route  *************/

const addProduct = require("../../Controllers/Admin/adminController").addProduct;
Router.post("/admin/addproduct",auth_Middleware,verifyAdmin,multerMiddleware.any(),addProduct);


/*********** Update Product Route  *************/

const updateProduct = require("../../Controllers/Admin/adminController").updateProduct;
Router.patch("/admin/updateproduct/:id",
auth_Middleware,
verifyAdmin,
multerMiddleware.any(),
check_ReqImageFile,
updateProduct);


/*********** Delete Product Route  *************/

const deleteProduct = require("../../Controllers/Admin/adminController").deleteProduct;
Router.delete("/admin/deleteproduct",auth_Middleware,verifyAdmin,deleteProduct);



/*********** get all Product categories Route  *************/

const getAllCatagory = require("../../Controllers/Admin/adminController").getAllCatagory;
Router.get("/admin/catagories",getAllCatagory);



/*********** product Review submit Route  *************/

const submitReview = require("../../Controllers/Admin/adminController").submitReview;
Router.post("/admin/catagories/:id",submitReview);



/*********** Adding Blogs Route  *************/

const addBlogs = require("../../Controllers/Admin/adminController").addBlogs;
Router.post("/admin/addblogs",auth_Middleware,verifyAdmin,multerMiddleware.any(),addBlogs);



/*********** update Blog Route  *************/

const updateBlog = require("../../Controllers/Admin/adminController").updateBlog;
Router.patch("/admin/updateblog/:id",auth_Middleware,verifyAdmin,multerMiddleware.any(),check_blogUpdation,updateBlog);



/*********** delete Blog Route  *************/

const deleteBlog = require("../../Controllers/Admin/adminController").deleteBlog;
Router.delete("/admin/delete/:id",auth_Middleware,verifyAdmin,deleteBlog);


/*********** delete Blog Route  *************/

const test = require("../../Controllers/Admin/adminController").test;
Router.get("/test/:id",fileDeleter,test);


/*********** addCategories Route  *************/

const addCategories = require("../../Controllers/Admin/adminController").addCategories;
Router.post("/admin/addcategories",auth_Middleware,verifyAdmin,multerMiddleware.any(),addCategories);


/*********** addAttribute Route  *************/

const addAttribute = require("../../Controllers/Admin/adminController").addAttribute;
Router.post("/admin/addattribute",attributeChecker,addAttribute);

/*********** updateattribute Route  *************/

const updateAttribute = require("../../Controllers/Admin/adminController").updateAttribute;
Router.patch("/admin/updateattribute/:id",updateAttribute);



module.exports = Router;