var User = require("../Model/user");
var CryptoJS = require("crypto-js");
var config = require("../config.js");
var userCtrl = {
	//返回promise对象
	loginWithUNAndPWD: function({
		userName,
		passWord
	}) {
		passWord = CryptoJS.MD5(passWord + config.secretKey).toString();
		var res = {
			status: true
		};
		return User.findOne({
			where: {
				userName: userName,
			}
		}).then(function(user) {
			if (user && user.passWord === passWord) {

			} else if (user) {
				res = {
					msg: "PassWord is not right!",
					status: false
				};
			} else {
				res = {
					msg: "User is not exist!",
					status: false
				};
			}
			return res;
		})
	},
	addUser:function({userName,email,nickName='匿名大侠',trueName='匿名大侠',passWord}) {
		passWord = CryptoJS.MD5(passWord + config.secretKey).toString();
		return User.findOrCreate({where: {userName: userName}, defaults: {passWord:passWord,email:email,nickName:nickName,trueName:trueName}});
	}
}
module.exports = userCtrl