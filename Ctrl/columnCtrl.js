var Column = require("../Model/column");
var config = require("../config.js");
var userCtrl = {
	//返回promise对象
	getColumnList: function() {
		return Column.findAll({
			attributes: [
				['columnId','id'], ['parentColumnId', 'parent'],['columnName','text'],'type'
			]
		});
	}
}
module.exports = userCtrl