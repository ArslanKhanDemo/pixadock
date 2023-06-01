const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
function sendSMS(req,res,to,CODE) {

    try {
        //console.log("accountSid: ", accountSid + " - " + "authToken: ", authToken);
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: `Your Verification CODE: ${CODE}`,
                from: process.env.TWILIO_NUMBER,
                to: to // Twilio can only send sms on verified Number by twilio itsels, 
                // or you need to buy a number to send sms to the unVerified numbers
            })
            .then(message => res.status(200).json({ "ALERT": message.to }));

    } catch (error) {
        res.status(500).json({ "error": error.message });
    }

}


module.exports = sendSMS;