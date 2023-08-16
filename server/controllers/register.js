const Register = require('../models/register')

exports.getUsers = async (req, res) => {
    const users = await Register.findAll()
    console.log(users)
}