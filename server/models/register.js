const sequelize = require('../db')
const { Sequelize } = require("sequelize");

const Register = sequelize.define(
    "register",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
    },
    {
        tableName: "Registration",
    }
)
Register.sequelize.sync()
module.exports = Register