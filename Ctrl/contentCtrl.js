var Content = require("../Model/content");
var config = require("../config.js");
var contentCtrl = {
	//返回promise对象
	addContent: function(content, userName) {
		content.userName = userName;
		return Content.create(content);
	},
	getContentListByParams: function(params) {
		var p = {};
		if (params.sort && (params.sort in Content.attributes)) {
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
				contentTitle: {
					like: "%" + params.search + "%"
				}
			};
		}

		return Content.findAndCountAll(p);
	},
	setPass: function(contentId, state) {
		let content = {
			state: state
		};
		return Content.update(content, {
			where: {
				contentId: contentId
			}
		});
	},
	getContentById: function(contentId) {

		return Content.findOne({
			where: {
				contentId: contentId
			}
		});
	},
	getPublicContentById:function (contentId) {
		return Content.findOne({
			where:{
				contentId:contentId,
				state:1
			}
		})
    },
    updateContentById:function(content) {
        content.state=0;
        return Content.update(content,{
            where: {
                contentId: content.contentId
            }
        });
    },
    deleteContent:function(contentId) {
        return Content.destroy({
            where:{
                contentId:contentId
            }
        });;
    }
}
module.exports = contentCtrl;