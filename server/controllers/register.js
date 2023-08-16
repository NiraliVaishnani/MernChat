const Register = require('../models/register')
const express = require('express');
const app = express();
app.use(express.json());


const jwt = require("jsonwebtoken");

const cookieParser = require('cookie-parser')
app.use(cookieParser())

exports.getUsers = async (req, res) => {
    const users = await Register.findAll()
    //  console.log(users)
    res.json(users)
}

exports.userregistration = async (req, res) => {
    const { email, password } = req.body;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // Requires at least one uppercase letter, one digit, and a minimum length of 6 characters
    if (!password.match(passwordRegex)) {
        return res.status(400).json({ message: 'Password must contain at least one uppercase letter and one digit' });
    }

    const users = await Register.create({ email: email, password: password });
    res.json(users);
}

exports.userlogin = async (req, res) => {
    const { email, password } = req.body;
    const useridentity = await Register.findOne({ where: { email: email } })
    if (password == useridentity.password) {
        console.log('Successfully login')
        const token = jwt.sign({ email }, "nirali");
        res.cookie("logintoken", token)
        console.log("Token", token)
        // res.json("Successfully logged in", { token: token })
        res.json({ message: 'Successfully logged in', token: token });

    }
    else {
        console.log("Err:", err);
        res.json("Err:", err)
    }

}