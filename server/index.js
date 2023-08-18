const express = require('express')
const app = express()
const sequelize = require('./db')
const port = 5000
const Register = require('./models/register')
const LoginAttempt = require('./models/LoginAttempt')
const Registerroutes = require("./routes/register")
const bodyParser = require('body-parser');
const cors = require('cors');
const ws = require('ws');
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
const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const wss = new ws.WebSocketServer({ server })
wss.on('connection', (connection, req) => {
    console.log("Connection established")
    const cookies = req.headers.cookie;
    //const cookies = token;
    console.log("Cookies:", cookies)
    if (cookies) {
        const tokenCookieString = cookies.split(';').find(str => str.startsWith('token='));
        if (tokenCookieString) {
            const token = tokenCookieString.split('=')[1];
            if (token) {
                jwt.verify(token, jwtSecret, {}, (err, userData) => {
                    if (err) throw err;
                    const { userId, username } = userData;
                    connection.userId = userId;
                    connection.username = username;
                });
            }
        }
    }
    console.log([...wss.clients].map(c => c.username))
})