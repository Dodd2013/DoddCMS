//TODO模型
var Sequelize = require('sequelize');
var sequelize = require("../DAO/dao");
var content = {
    contentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contentTitel: {
        type: Sequelize.STRING,
        allowNull: true
    },
    contentDESC: {
        type: Sequelize.STRING,
        allowNull: true
    },
    contentType: {
        type: Sequelize.STRING,
        allowNull: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    isHot: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: "0",
    },
    userName: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true,
            len: [4, 16]
        },
        allowNull: false
    },
};
module.exports = sequelize.define('content', content, {
    freezeTableName: true
});