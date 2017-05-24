//TODO模型
var Sequelize = require('sequelize');
var sequelize = require("../DAO/dao");
var ad = {
    adId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    adName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    adPos: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adUrl:{
        type: Sequelize.STRING,
        allowNull: true
    },
    adData:{
        type: Sequelize.STRING,
        allowNull: false
    },
    orderby:{
        type:Sequelize.INTEGER,
        defaultValue: "0",
    }
};
module.exports =sequelize.define('ad', ad, {
    freezeTableName: true
});