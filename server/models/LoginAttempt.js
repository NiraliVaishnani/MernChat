const sequelize = require('../db')
const { Sequelize } = require("sequelize");

const LoginAttempt = sequelize.define(
    "LoginAttempt",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: Sequelize.STRING,
        attempts: Sequelize.INTEGER,
        lastAttempt: Sequelize.DATE,
    },
    {
        tableName: "LoginAttempt",
    }
)
LoginAttempt.sequelize.sync()
module.exports = LoginAttempt