const express = require('express')
const app = express()
const sequelize = require('./db')
const port = 5000
const Register = require('./models/register')

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/register', (req, res) => {
    const { username, password } = req.body;

})

sequelize
    .sync()
    .then(() => {
        console.log("Models synchronized successfully.");
    })
    .catch((err) => {
        console.error("Error synchronizing models:", err);
    });
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})