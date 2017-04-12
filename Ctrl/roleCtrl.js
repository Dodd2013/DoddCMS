var Role = require("../Model/role");
var config = require("../config.js");
var roleCtrl = {
	//返回promise对象
	addRole:function({roleName,DESC='没有描述'}) {
		return Role.findOrCreate({where:{roleName:roleName},defaults:{DESC:DESC}});
	}
}
module.exports = roleCtrl