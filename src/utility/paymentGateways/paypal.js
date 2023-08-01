const paypal = require('paypal-rest-sdk');
let pay = (req, res) => {
    const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;           // Marchent account as client ID
    const PAYPAL_SECRET_KEY1 = process.env.PAYPAL_SECRET_KEY1;       // Marchent account as SECRET kEY
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': PAYPAL_CLIENT_ID,
        'client_secret': PAYPAL_SECRET_KEY1
    });

    /**********************************************/


    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",   // On SUCCESS of the payment, this route will triger
            "cancel_url": "http://localhost:3000/cancel"        // On CANCELATION of the payment, this route will triger
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };


    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            console.log(payment.links[1].href);
            res.redirect(payment.links[1].href);
            //res.status(200).json({"payment.links[1].href":payment.links[1].href});
        }
    });
}

let payResponse = (req,res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    };

    //var paymentId = 'PAYMENT id created in previous step';

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log("Success");
            res.render("index");
        }
    });
}


module.exports = {pay,payResponse};