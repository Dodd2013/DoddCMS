var column = require("../column");
var content = require("../content");
var Sequelize = require('sequelize');
var sequelize = require("../../DAO/dao");
//一对多关系
column.hasMany(content, {as: 'Content',foreignKey:'columnId'});
content.belongsTo(column,{as: 'Column',foreignKey:'columnId'});
module.exports={};