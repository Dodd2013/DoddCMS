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
        type: Sequelize.STRING,
    },
    columnName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    type:{
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