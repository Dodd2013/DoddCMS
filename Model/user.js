//用户模型
var Sequelize = require('sequelize');
var sequelize=require("../DAO/dao");
var user = {
    userName: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true,
            len: [4, 16]
        },
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    nickName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    trueName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    passWord: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [6, 16]
        }
    }
};
module.exports = sequelize.define('user', user, {
    freezeTableName: true
});