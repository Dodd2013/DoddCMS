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
        defaultValue: "get",
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
        defaultValue: true
    }
};
module.exports = sequelize.define('permission', permission, {
    freezeTableName: true
});