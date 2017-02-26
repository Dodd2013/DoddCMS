var User = require("../Model/user");
var CryptoJS = require("crypto-js");
var config = require("../config.js");
var userCtrl = {
	//返回promise对象
	loginWithUNAndPWD: function({
		userName,
		password
	}) {
		password=CryptoJS.MD5(password+config.secretKey).toString();
		console.log(password);
		var res={status: true};
		return User.findOne({
			where: {
				userName: userName,
			}
		}).then(function(user) {
			if (user && user.passWord == password) {
				
			} else if(user){
				res={
					msg: "PassWord is not right!",
					status: false
				};
			}else{
				res={
					msg: "User is not exist!",
					status: false
				};
			}
			return res;
		})
	}
}
module.exports = userCtrl