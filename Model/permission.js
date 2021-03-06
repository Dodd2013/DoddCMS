//permission权限模型

var Sequelize = require('sequelize');
var sequelize = require("../DAO/dao");
var permission = {
    permissionId: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    actionUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    method: {
        type: Sequelize.STRING,
        defaultValue: "GET",
        allowNull: false
    },
    permissionName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESC: {
        type: Sequelize.STRING,
        allowNull: true
    },
    "public": {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
};
module.exports = sequelize.define('permission', permission, {
    freezeTableName: true
});