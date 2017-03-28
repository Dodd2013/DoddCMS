var navBar = require("../Model/navbar");
module.exports = {
	deleteNavBar: function(navbar) {
		return navBar.destroy({
			where: {
				itemId:navbar.itemId
			}
		});
	},
	editNavBar: function(navbar) {
		return navBar.update(navbar, {
			where: {
				itemId: navbar.itemId
			}
		});
	},
	addNavBar: function(navbar) {
		return navBar.create(navbar);
	},
	getNavbarByOrder: function() {
		return navBar.findAll({
			order: 'orderby DESC'
		});
	},
	getNavbarByParams: function(params) {
		var p = {};
		if (params.sort && (params.sort in navBar.attributes)) {
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
				itemName: {
					like: "%" + params.search + "%"
				}
			};
		}

		return navBar.findAndCountAll(p);
	}
}