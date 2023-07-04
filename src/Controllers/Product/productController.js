const response = require("../../utility/Response/response");
const productReviewSchema = require("../../models/productReviewSchema/productReviewSchema");
const productTypeSchema = require("../../models/productTypeSchema/productTypeSchema");
const brandSchema = require("../../models/brandSchema/brandSchema");



/*********** get approved Reviews start  *************/
const approvedReviews = async (req, res) => {
    try {
        let result = await productReviewSchema.find({productID:req.params.id,approved:true});
        response(res, 200, {
            status: 200,
            result: result
        })
    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** get approved Reviews Ends  *************/



/*********** ADD product type start  *************/
const addProductType = async (req, res) => {
    try {
        let type = req.body.productType;
        type = type.toLowerCase();
        let productType = await productTypeSchema.create({
            productType:type
        });
        if (productType) {
            response(res, 200, {
                status: 200,
                result: productType
            }) 
        } else {
            response(res,404,"productType not found");
        }
    } catch (error) {
        response(res, 501, {
            status: 501,
            error: error.message
        })
    }
}
/*********** ADD product type Ends  *************/



/*********** delete product type start  *************/
const deleteProductType = async (req, res) => {
    try {
        let {productType} = req.body;
        let deleteProductType = await productTypeSchema.findOneAndDelete({
            productType
        });
        if (deleteProductType) {
            response(res, 200, {
                status: 200,
                result: deleteProductType
            }) 
        } else {
            response(res,404,"productType not found");
        }
    } catch (error) {
        response(res, 501, {
            status: 501,
            error: error.message
        })
    }
}
/*********** delete Product Type Ends  *************/



/*********** getting producttypes start  *************/
const gettingProductTypes = async (req, res) => {
    try {
        let gettingProductTypes = await productTypeSchema.find();
        if (gettingProductTypes) {
            response(res, 200, {
                status: 200,
                result: gettingProductTypes
            }) 
        } else {
            response(res,404,"No Product Found");
        }
    } catch (error) {
        response(res, 501, {
            status: 501,
            error: error.message
        })
    }
}
/*********** getting producttypes Ends  *************/




/*********** add brands start  *************/
const addBrand = async (req, res) => {
    try {
        let { brandName } = req.body;
        brandName = brandName.toLowerCase();
        let addBrand = await brandSchema.create({
            brandName,
            image: req.files[0].filename,
        });
        if (addBrand) {
            response(res, 200, {
                status: 200,
                result: addBrand
            }) 
        } else {
            response(res,404,"brand adding Failed");
        }
    } catch (error) {
        response(res, 501, {
            status: 501,
            error: error.message
        })
    }
}
/*********** add brands Ends  *************/


/*********** getting all brands start  *************/
const gettingBrand = async (req, res) => {
    try {
        let brands = await brandSchema.find();
        if (brands) {
            response(res, 200, {
                status: 200,
                result: brands
            }) 
        } else {
            response(res,404,"No brand Found");
        }
    } catch (error) {
        response(res, 501, {
            status: 501,
            error: error.message
        })
    }
}
/*********** getting all brands Ends  *************/





module.exports = {
    approvedReviews,
    addProductType,
    deleteProductType,
    gettingProductTypes,
    addBrand,
    gettingBrand
}