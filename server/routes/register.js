const express = require('express');
const router = express.Router();
const register = require('../controllers/register')

router.get("/register", register.getUsers)