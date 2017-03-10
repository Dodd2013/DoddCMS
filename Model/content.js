//TODO模型
var Sequelize = require('sequelize');
var sequelize = require("../DAO/dao");
var content = {
    contentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contentType: {
        type: Sequelize.STRING,
        allowNull: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: true
    }
};
module.exports =sequelize.define('content', content, {
    freezeTableName: true
});