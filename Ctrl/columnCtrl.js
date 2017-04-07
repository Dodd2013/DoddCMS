var Column = require("../Model/column");
var Content = require("../Model/content");
var config = require("../config.js");

var columnCtrl = {
	//返回promise对象
	getColumnList: function() {
		return Column.findAll({
			attributes: [
				['columnId', 'id'],
				['parentColumnId', 'parent'],
				['columnName', 'text'], 'type', 'DESC', 'onIndexPage'
			]
		});
	},
	addColumn: function(column) {
		return Column.create(column);
	},
	getIndexPageCoumnAndContent: function() {
		return Column.findAll({
			where: {
				onIndexPage: 1,
				type: {
					$not: 'root'
				}
			},
			include: [{
				model: Content,
				as: 'Content',
				where: {
					state: 1
				},
				attributes: [
					'simpleTitle',
					'contentId'
				]
			}]
		});
	},
	editColumn: function(column) {
		return Column.update(column, {
			where: {
				columnId: column.columnId
			}
		})
	},
	deleteColumn: function(column) {
		return Column.destroy({
			where: {
				columnId: column.columnId
			}
		})
	}
}
module.exports = columnCtrl;