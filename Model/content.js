//TODO模型
var Sequelize = require('sequelize');
var sequelize = require("../DAO/dao");
var column=require("./column");
var content = {
    contentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    source: {
        type: Sequelize.STRING,
        allowNull: true
    },
    sourceUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
    contentTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    simpleTitle: {
        type: Sequelize.STRING,
        allowNull: true
    },
    contentDESC: {
        type: Sequelize.STRING,
        allowNull: true
    },
    contentType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contentWithHTML: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    contentText: {
        type: Sequelize.TEXT,
        allowNull: false
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
        type: Sequelize.STRING
    },
    columnId: {
        type: Sequelize.INTEGER,
        references: {
            // This is a reference to another model
            model: column,

            // This is the column name of the referenced model
            key: 'columnId',
        }
    },
    state: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
};
module.exports = sequelize.define('content', content, {
    freezeTableName: true
});