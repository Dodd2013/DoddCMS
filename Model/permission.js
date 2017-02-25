var Sequelize = require('sequelize');
var sequelize = require("../DAO/dao");
var permission = {
    permissionId: {
        type: Sequelize.INTEGER,
        unique: true
    },
    actionUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    permissionName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESC: {
        type: Sequelize.STRING,
        allowNull: true
    }
};
module.exports = sequelize.define('permission_permission', permission, {
    freezeTableName: true
});