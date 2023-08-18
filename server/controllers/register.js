const Register = require('../models/register')
const express = require('express');
const app = express();
app.use(express.json());
const Sequelize = require('sequelize')
const LoginAttempt = require('../models/LoginAttempt')
const cron = require('node-cron');


const jwt = require("jsonwebtoken");

const cookieParser = require('cookie-parser')
app.use(cookieParser())
//const time = '*/1 * * * * *'
cron.schedule('0 0 * * *', async () => {
    console.log("Email")
    removeAllOldLoginAttempts();

});

// cron.schedule('*/2 * * * * *', () => {
//     console.log('Cron job 2 executed');
// });


exports.getUsers = async (req, res) => {
    const users = await Register.findAll()
    //  console.log(users)
    res.json(users)
}

exports.userregistration = async (req, res) => {
    const { email, password } = req.body;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // Requires at least one uppercase letter, one digit, and a minimum length of 6 characters
    if (!password.match(passwordRegex)) {
        return res.status(401).json({ message: 'Password must contain at least one uppercase letter and one digit' });
    }
    const users = await Register.create({ email: email, password: password });
    const token = jwt.sign({ email }, "nirali");
    res.cookie("logintoken", token)
    console.log("Token", token)

    res.json(users);
}

exports.userlogin = async (req, res) => {
    const { email, password } = req.body;
    const useridentity = await Register.findOne({ where: { email: email } })
    const loginAttempt = await LoginAttempt.findOne({ where: { email: email } })
    if (!loginAttempt) {
        await LoginAttempt.create({ email: email, attempts: 0, lastAttempt: null })
    }
    // console.log(loginAttempt.attempts)
    if (password == useridentity.password) {
        console.log('Successfully login')
        const token = jwt.sign({ email }, "nirali");
        res.cookie("logintoken", token)
        console.log("Token", token)
        res.json({ message: 'Successfully logged in', token: token });

    }
    else {
        console.log("Invalid password");
        loginAttempt.attempts++;
        loginAttempt.lastAttempt = Sequelize.literal('CURRENT_TIMESTAMP');
        await loginAttempt.save();

        res.status(401).json({ message: 'Incorrect password', attempts: loginAttempt.attempts, lastAttempt: loginAttempt.lastAttempt });

    }

}

const removeAllOldLoginAttempts = async () => {
    try {
        // Assuming LoginAttempt is your Sequelize model
        console.log('Removing all old login attempts')
        await LoginAttempt.destroy({
            where: {
                lastAttempt: {
                    [Sequelize.Op.lt]: new Date(new Date() - 24 * 60 * 60 * 1000) // 24 hours ago
                }
            }
        });
        console.log('Old login attempts removed.');
    } catch (error) {
        console.error('Error deleting old login attempts:', error);
    }
};