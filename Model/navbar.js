//TODO模型
var Sequelize = require('sequelize');
var sequelize = require("../DAO/dao");
var navbar = {
    itemId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    itemName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    orderby:{
        type:Sequelize.INTEGER,
        defaultValue: "0",
    }
};
module.exports =sequelize.define('navbar', navbar, {
    freezeTableName: true
});