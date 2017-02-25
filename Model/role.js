var Sequelize = require('sequelize');
var sequelize = require("../DAO/dao");
var role = {
    roleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESC: {
        type: Sequelize.STRING,
        allowNull: true
    }
};
module.exports =sequelize.define('permission_role', role, {
    freezeTableName: true
});