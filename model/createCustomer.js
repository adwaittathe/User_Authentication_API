
 
const createCustomerSimplify = async function(body){
	var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: process.env.simplify_publicKey,
        privateKey: process.env.simplify_privateKey
    });
	console.log("INCREATE");

	client.customer.create({
		email : body.email,
		name : body.firstName + " " + body.lastName,
		reference : "Ref1"
	}, function(errData, data){
	 
		if(errData){
			console.log("ERROR");
			console.error("Error Message: " + errData.data.error.message);
			// handle the error
			return;
		}
		console.log("Success Response: " + JSON.stringify(data));
		let JSONdata = JSON.stringify(data);
		return JSONdata;
	});

}

module.exports.createCustomerSimplify = createCustomerSimplify;
