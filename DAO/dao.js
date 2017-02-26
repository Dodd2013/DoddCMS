var Sequelize = require('sequelize');
var mysqlConfig = require('../config').mysqlConfig;
var sequelize = new Sequelize(mysqlConfig.dbname, mysqlConfig.dbuser, mysqlConfig.dbpwd, {
	host: mysqlConfig.dbhost,
	dialect: 'mysql',
	dialectOptions: {
		charset: "utf8",
		collate: "utf8_unicode_ci",
	},
	pool: mysqlConfig.pool,
	charset:"utf8",
	collate:"utf8_unicode_ci",
	define: {
		// underscored: true,
		freezeTableName: true,
		syncOnAssociation: true
	}
});
module.exports = sequelize;