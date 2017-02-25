var Sequelize = require('sequelize');
var mysqlConfig = require('../config.js').mysqlConfig;
var sequelize = new Sequelize(mysqlConfig.dbname, mysqlConfig.dbuser, mysqlConfig.dbpwd, {
  host: mysqlConfig.dbhost,
  dialect: 'mysql',
  pool: mysqlConfig.pool
});
module.exports = sequelize;