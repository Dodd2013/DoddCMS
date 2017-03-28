var Column = require("../Model/column");
var config = require("../config.js");
var columnCtrl = {
	//返回promise对象
	getColumnList: function() {
		return Column.findAll({
			attributes: [
				['columnId', 'id'],
				['parentColumnId', 'parent'],
				['columnName', 'text'], 'type', 'DESC'
			]
		});
	},
	addColumn: function(column) {
		return Column.create(column);
	},
	editColumn: function(column) {
		return Column.update(column, {
			where: {
				columnId: column.columnId
			}
		})
	},
	deleteColumn:function(column) {
		return Column.destroy({
			where: {
				columnId: column.columnId
			}
		}) 
	}
}
module.exports = columnCtrl;