var User = require("../Model/user");
var CryptoJS = require("crypto-js");
var config=require("../config.js");
var userCtrl = {

	loginWithUNAndPWD: function({userName,password}}) {
		User.findOne({where:{userName:userName,passWord:CryptoJS.AES.encrypt(password, config.secretKey);}})
	}
}
module.exports = userCtrl