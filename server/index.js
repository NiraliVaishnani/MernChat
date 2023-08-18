const express = require('express')
const app = express()
const sequelize = require('./db')
const port = 5000
const Register = require('./models/register')
const LoginAttempt = require('./models/LoginAttempt')
const Registerroutes = require("./routes/register")
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());


app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/register', (req, res) => {
    const { username, password } = req.body;

})
app.use("/account", Registerroutes)

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