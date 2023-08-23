

const sequelize = require('../db')
const { Sequelize } = require("sequelize");
const Register = require('./register')
const Message = sequelize.define('Message', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    senderId: {
        type: Sequelize.INTEGER,

    },
    recipientId: {
        type: Sequelize.INTEGER,

    },
    text: {
        type: Sequelize.STRING
    },
    file: {
        type: Sequelize.STRING
    }
}, {
    tableName: "Messages",
    timestamps: true
});
Message.belongsTo(Register, { as: 'Sender', foreignKey: 'senderId' });
Message.belongsTo(Register, { as: 'Recipient', foreignKey: 'recipientId' });
Message.sync();
module.exports = Message;
