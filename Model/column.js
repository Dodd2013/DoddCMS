//栏目模型
var Sequelize = require('sequelize');
var sequelize = require("../DAO/dao");
var column = {
    columnId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    parentColumnId:{
        type: Sequelize.INTEGER,
    },
    columnName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    DESC: {
        type: Sequelize.STRING,
        allowNull: true
    }
};
module.exports =sequelize.define('column', column, {
    freezeTableName: true
});