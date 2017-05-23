var Role = require("../Model/role");
var config = require("../config.js");
var roleCtrl = {
	//返回promise对象
	addRole:function({roleName,DESC='没有描述'}) {
		return Role.findOrCreate({where:{roleName:roleName},defaults:{DESC:DESC}});
	},
	deleteRole: function(role) {
		return Role.destroy({
			where: {
				roleId:role.roleId
			}
		});
	},
	editRole: function(role) {
		return Role.update(role, {
			where: {
				roleId: role.roleId
			}
		});
	},
	getRoleByParams: function(params) {
		var p = {};
		if (params.sort && (params.sort in Role.attributes)) {
			p.order = params.sort + ' ' + params.order;
		}
		if (params.limit && params.limit < 80) {
			p.limit = Number.parseInt(params.limit);
		} else {
			p.limit = 20;
		}
		if (params.offset) {
			p.offset = Number.parseInt(params.offset);
		} else {
			p.offset = 0;
		}
		if (params.search) {
			// console.log("%"+params.search+"%");
			p.where = {
				roleName: {
					like: "%" + params.search + "%"
				}
			};
		}

		return Role.findAndCountAll(p);
	}

}
module.exports = roleCtrl