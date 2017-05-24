var Ad = require("../Model/ad");
module.exports = {
	deleteAd: function(ad) {
		return Ad.destroy({
			where: {
				adId:ad.adId
			}
		});
	},
	editAd: function(ad) {
		return Ad.update(ad, {
			where: {
				adId: ad.adId
			}
		});
	},
	addAd: function(ad) {
		return Ad.create(ad);
	},
	getAdByOrder: function() {
		return Ad.findAll({
			order: 'orderby DESC'
		});
	},
	getAdByParams: function(params) {
		var p = {};
		if (params.sort && (params.sort in Ad.attributes)) {
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
				adName: {
					like: "%" + params.search + "%"
				}
			};
		}

		return Ad.findAndCountAll(p);
	}
}