const userSchema = require("../../models/userSchema/userSchema");
const tokenSchema = require("../../models/tokenSchema/tokenSchema");
const productSchema = require("../../models/productSchema/productSchema");
const categorySchema = require("../../models/categorySchema/categorySchema");
const attributeSchema = require("../../models/attributeSchema/attributeSchema");

const productReviewSchema = require("../../models/productReviewSchema/productReviewSchema");
const response = require("../../utility/Response/response");
const blogSchema = require("../../models/blogsSchema/blogsSchema");


/*********** Registration Starts *************/
const registration = async (req, res) => {
    try {
        const {
            contryCode,
            phone,
            firstName,
            lastName,
            userName,
            email,
            password,
            DOB,
            termAndConditions,
            privacyPolicy
        } = req.body;


        let create = await userSchema.create({
            phone: "+" + contryCode + phone,
            firstName,
            lastName,
            userName,
            email,
            password,
            DOB,
            termAndConditions,
            privacyPolicy,
            phoneVerified: false,
            role: "Admin"
        });
        let result = {
            result: create,
            Status: 200
        }
        response(res, 200, result);
    } catch (error) {
        console.log({ "Error from reg": error });
        response(res, 502, {
            status: 501,
            message: error.message
        });
    }

}
/*********** Registration - Ends *************/





/*********** Login  *************/
const Login = async (req, res) => {
    try {
        console.log("Admin LoggedInn");

    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** Login Ends  *************/

/*********** Update Starts  *************/
const Update = async (req, res) => {
    try {
        try {
            let updatedRecord = await userSchema.findOneAndUpdate(
                { _id: process.env.USER_ID },
                req.body,
                { new: true }
            );
            response(res, 201, updatedRecord);
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
/*********** Update Ends  *************/



/*********** LoginOut  *************/
const logOut = async (req, res) => {
    try {
        console.log();
        if (process.env.USER_ID) { // if system continues without any cutoff
            let distroySession = await tokenSchema.findOneAndDelete({ userID: process.env.USER_ID });
            console.log("with process.env.USER_ID / if system continues without any cutoff");
            response(res, 200, {
                status: 200,
                result: distroySession.userID,
                State: "Logged Out Successfully"
            })
        } else {
            // if system cutoff or changes its state / codeChange.
            let distroySession = await tokenSchema.findOneAndDelete({ token: process.env.token });
            console.log("with process.env.token / if system cutoff or changes its state / codeChange.");
            response(res, 200, {
                status: 200,
                result: distroySession.userID,
                State: "Logged Out Successfully"
            })
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** LoginOut Ends  *************/


/*********** sendCode api Start *************/
const sendCode = async (req, res) => {
    try {
        let userPhone = process.env.PHONE;
        console.log("UserPhone:", userPhone);
        let twilio = require('../../utility/twilio/twilio');
        const CODE = require("../../utility/verificationCodeGenerator/codeGenerator")();
        console.log(CODE);
        twilio(req, res, userPhone, CODE);
    } catch (error) {
        response(res, 500, error.message);
    }
}
/*********** sendCode api Ends *************/


/*********** verification_Code_Submit api Start  *************/

const verification_Code_Submit = async (req, res) => {
    try {
        let { code } = req.body;
        let verifier = require("../../helper/twilioVerifier/twilioVerifier");
        let result = verifier(code);
        console.log(result);
        if (result) {
            let verified = await userSchema.findByIdAndUpdate(process.env.USER_ID, {
                phoneVerified: true
            }, { new: true });
            if (verified) {
                response(res, 200, {
                    status: 200,
                    result: verified,
                })
            } else {
                response(res, 204, {
                    status: 204,
                    result: "Not Found",
                })
            }
        }
        //console.log(result);
        else {
            response(res, 200, {
                status: 200,
                result: "Wrong Code, Not Verified",
            });
        }
        //res.end();

    } catch (error) {
        response(res, 500, error.message);
    }
}

/*********** verification_Code_Submit Ends  *************/








/*********** addProduct api Start *************/
const addProduct = async (req, res) => {
    try {

        let { category, name, price, attributes, stock, brand } = req.body;
        price = parseInt(price);
        //attributes = JSON.parse(attributes); /** if --> form-data  */
        console.log(req.files === undefined);
        let productCreated = await productSchema.create({
            category,
            brand,
            name,
            attributes,
            stock,
            price,
            image: req.files ? req.files[0].filename : "No Path"
        });
        if (productCreated) {
            response(res, 201, {
                status: 201,
                result: productCreated
            })
        } else {
            response(res, 500, {
                status: 500,
                result: "Internal Error"
            });
        }
    } catch (error) {
        console.log(error);
        response(res, 500, {
            status: 500,
            Error: error.message
        });
    }
}
/*********** addProduct api Ends *************/


// const product = await productSchema.findOneAndUpdate(
//     { _id: req.params.id, 'attributes.attribute': "Color" },
//     { $set: { 'attributes.$.value': "Brown" } },
//     { new: true });


/*********** UpdatedProduct api Start *************/

const updateProduct = async (req, res) => {
    try {
        let isThere = false;
        if (req.body.attribute) {
            console.log(req.body.attribute);
            console.log("in req.body.attribute");
            let isAttributes = await productSchema.findById(req.params.id);
            if (isAttributes.attributes.length === 0) {
                console.log("In isAttribute");
                let addAttribute = await productSchema.findOneAndUpdate({
                    _id: req.params.id
                }, {
                    attributes: [{
                        attribute: req.body.attribute,
                        value: req.body.value
                    }]
                }, { new: true });
                response(res, 201, addAttribute);
            } else {
                console.log("attributes array is not empty");
                for (let index = 0; index < isAttributes.attributes.length; index++) {
                    if (isAttributes.attributes[index].attribute === req.body.attribute) {
                        isThere = true
                        break;
                    }
                }
                if (isThere === false) {
                    let arr = [...isAttributes.attributes];
                    arr.push({
                        attribute: req.body.attribute,
                        value: req.body.value
                    });
                    let s = await productSchema.findOneAndUpdate({ _id: req.params.id }, { attributes: arr }, { new: true });
                    response(res, 201, s);
                }
                if (isThere === true) {
                    console.log("isThere === true");
                    const product = await productSchema.findOneAndUpdate(
                        { _id: req.params.id, 'attributes.attribute': `${req.body.attribute}` },
                        { $set: { 'attributes.$.value': `${req.body.value}` } },
                        { new: true });
                    response(res, 201, product);
                    //await productSchema.deleteMany();
                }
            }

        } else {
            let { id, price, image } = req.body;
            price = parseInt(price);
            const product = await productSchema.findByIdAndUpdate(req.params.id, req.body,
                { new: true });
            if (product) {
                response(res, 201, {
                    status: 201,
                    result: product
                })
            } else {
                response(res, 404, {
                    status: 404,
                    result: "Product NOT Updated"
                })
            }
        }

    } catch (error) {
        console.log(error);
        response(res, 500, {

            status: 500,
            result: error.message
        });
    }
}
/*********** UpdatedProduct api Ends *************/


/*********** deleteProduct api Start *************/
const deleteProduct = async (req, res) => {
    try {
        let { id } = req.body;
        console.log(id);
        const product = await productSchema.findByIdAndDelete(id);
        if (product) {
            response(res, 201, {
                status: 201,
                result: product
            })
        } else {
            response(res, 404, {
                status: 404,
                result: "Product NOT deleted"
            })
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** deletedProduct api Ends *************/








/*********** get all Product catagory api Start *************/
const getAllCatagory = async (req, res) => {
    try {
        let allCategory = await categorySchema.find();
        console.log(allCategory.length);
        //await productSchema.deleteMany();
        response(res, 201, {
            status: 201,
            result: allCategory
        })
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}

/*********** get all Product catagory api Ends *************/



/*********** Submit product Review api Start *************/
const submitReview = async (req, res) => {
    try {
        let {
            rating,
            userName,
            email,
            review } = req.body;
        console.log("req.params.id:", req.params.id);
        let allCatagory = await productReviewSchema.create({
            productID: req.params.id,
            rating,
            userName,
            email,
            review,
            approved: true
        });
        response(res, 201, {
            status: 201,
            result: allCatagory
        })
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** submit Product Review catagory api Ends *************/



/*********** Adding Blogs api Start *************/
const addBlogs = async (req, res) => {
    try {

        const {
            heading,
            content
        } = req.body;
        let blogCreated = await blogSchema.create({
            heading,
            image: req.files[0].filename,
            content
        });
        if (blogCreated) {
            response(res, 201, {
                status: 201,
                result: blogCreated
            })
        } else {
            response(res, 500, {
                status: 500,
                result: "Internal Error from adding blog api"
            });
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** Adding Blogs api Ends *************/




/*********** updateBlog api Start *************/
const updateBlog = async (req, res) => {
    try {

        let updatedBlog = await blogSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (updateBlog) {
            response(res, 200, {
                status: 200,
                result: updatedBlog
            });
        } else {
            response(res, 404, {
                status: 404,
                result: "updateBlog Not Found ",
            });
        }


    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** updateBlog api Ends *************/


/*********** deleteBlog api Start *************/
const deleteBlog = async (req, res) => {
    try {

        let deleteBlog = await blogSchema.findByIdAndDelete(req.params.id, { new: true });
        if (deleteBlog) {
            response(res, 204, {
                status: 204,
                result: "deleteBlog Deleted"
            });
        } else {
            response(res, 404, {
                status: 404,
                result: "record Not Found ",
            });
        }


    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** deleteBlog api Ends *************/


/*********** test api Start *************/
const test = async (req, res) => {
    try {
        //console.log("req.body:",Object.keys(req.body).length);
        response(res, 200, {
            status: 200,
            result: req.body,
            result2: req.files
        });


    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** test api Ends *************/

/*********** Add Categories api Start *************/
const addCategories = async (req, res) => {
    try {
        let {
            categoryName,
            parent
        } = req.body;
        // console.log("from admin con backEnd1:");
        //console.log("from admin con backEnd2:",req.files[0]);
        console.log(parent === "");
        if (parent === "") {
            parent = "No Parent"
        }
        let findCategory = await categorySchema.findOne({ categoryName });
        if (findCategory) {
            response(res, 201, {
                status: 201,
                result: "Category Already Exist"
            });
        } else {
            let categoryAdded = await categorySchema.create(
                {
                    image: req.files[0].filename,
                    categoryName,
                    parent
                }
            );
            if (categoryAdded) {
                //await categorySchema.deleteMany();
                response(res, 201, {
                    status: 201,
                    result: categoryAdded
                });

            } else {
                response(res, 404, {
                    status: 404,
                    result: "Added Catrgory Not Found"
                });
            }
        }


    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** Add Categories api Ends *************/



/*********** Add Attribute api Start *************/
const addAttribute = async (req, res) => {
    try {
        let { attributeName, slug, values } = req.body;
        // attributeName = attributeName.toLowerCase();
        console.log(attributeName);
        let attribute = await attributeSchema.create({
            attributeName, slug, values
        });
        if (attribute) {
            // await attributeSchema.deleteMany();
            response(res, 200, attribute);
        } else {
            response(res, 200, "attribute not added");
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** Add Attribute api Ends *************/


/*********** Add Attribute api Start *************/
const updateAttribute = async (req, res) => {
    try {
        let matched = false;
        let val2 = [];
        // let {
        //     attributeName, slug, values
        // } = req.body;
        let values = req.body.values;
        let val = values.toString().toLowerCase();
        val2.push(val);
        values = val2;
        //console.log("req.prams.id:", typeof req.params.id);
        let id = req.params.id.toString();
        req.params.id = id.toLowerCase();
        //console.log("reached 1");
        let find = await attributeSchema.findOne({ attributeName: req.params.id });
        if (find) {
            //console.log("length: ",find.values.length);
            for (let index = 0; index < find.values.length; index++) {

                if (find.values[index] == values) {
                    console.log("Matched");
                    matched = true
                    break;
                }
            }
            //console.log("reached 2");
            if (matched) {
                console.log(`Error: The Veriante of ${req.params.id} is already added`);
                response(res, 409, `The Veriante of ${req.params.id} is already added`);
            } else {
                if (values == "") {
                    response(res, 200, `The Veriante of ${req.params.id} can't be empty...`);
                } else {
                    //console.log("reached 3");
                    //console.log("values:",values);
                    //console.log("val2:",val2);
                    //console.log("find.values:",find.values);
                    let attribute = await attributeSchema.updateOne({ attributeName: req.params.id }, {
                        values: [...val2, ...find.values]
                    });
                    //console.log("reached4");
                    if (attribute) {
                        // await attributeSchema.deleteMany();
                        response(res, 200, attribute);
                    } else {
                        response(res, 200, "attribute not added");
                    }
                }
            }
        } else {
            response(res, 404, `The attribute: ${req.params.id} is not registered`);
        }
    } catch (error) {
        console.log(error);
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}
/*********** Add Attribute api Ends *************/





// /*********** Add Attribute api Start *************/
// const addAttribute = async (req, res) => {
//     try {
//        response(res,200,"working")
//     } catch (error) {
//         response(res, 500, {
//             status: 500,
//             result: error.message
//         });
//     }
// }
// /*********** Add Attribute api Ends *************/





module.exports = {
    registration,
    Login,
    Update,
    logOut,

    sendCode,
    verification_Code_Submit,
    
    addProduct,
    updateProduct,
    deleteProduct,
    
    addCategories,
    getAllCatagory,
    submitReview,
    
    addBlogs,
    updateBlog,
    deleteBlog,
    
    addAttribute,
    updateAttribute,
    
    
    
    
    test,
}