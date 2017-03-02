//功能模块模型

var Sequelize = require('sequelize');
var sequelize = require("../DAO/dao");
var functionModel = {
    functionModelId: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    functionModelName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adminUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESC: {
        type: Sequelize.STRING,
        allowNull: true
    }
};
module.exports = sequelize.define('functionModel', functionModel, {
    freezeTableName: true
});