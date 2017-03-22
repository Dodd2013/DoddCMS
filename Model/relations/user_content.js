var user = require("../user");
var content = require("../content");
var Sequelize = require('sequelize');
var sequelize = require("../../DAO/dao");
//一对多关系
user.hasMany(content, {as: 'Content',foreignKey:'userName'});
content.belongsTo(user,{as: 'User',foreignKey:'userName'});
module.exports={};