const express = require("express");
const app = express();
const sequelize = require("./db");
const port = 5000;
const Register = require("./models/register");
const LoginAttempt = require("./models/LoginAttempt");
const Message = require("./models/Message");
const Registerroutes = require("./routes/register");
const messageroutes = require("./routes/Message")
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const ws = require("ws");
app.use(cors());

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/register", (req, res) => {
  const { username, password } = req.body;
});
app.use("/account", Registerroutes);
app.use("/", messageroutes);

sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing models:", err);
  });
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const wss = new ws.WebSocketServer({ server });
wss.on("connection", (connection, req) => {
  console.log("Connection established");
  // Retrieve the token from the WebSocket handshake headers
  const tokenWithPrefix = req.headers["sec-websocket-protocol"];
  console.log("Token with prefix", tokenWithPrefix);
  const parts = tokenWithPrefix.split(', ');


  const tokenIndex = parts.indexOf("logintoken") + 1;
  const usernameIndex = parts.indexOf("username") + 1;
  const userIdIndex = parts.indexOf("userId") + 1;

  // Extract the token
  const token = parts[tokenIndex];
  const username = parts[usernameIndex];
  const userId = parts[userIdIndex];

  console.log("etyuewtuwety", token); // Output: the actual token value

  try {
    const decoded = jwt.verify(token, "nirali");
    console.log("Decoded token:", decoded); // Log the decoded payload
    const userEmail = decoded.email;

    // Associate the connection with the user's email
    connection.userEmail = userEmail;
    connection.userId = userId;
    connection.username = username;
  } catch (error) {
    console.error("JWT verification error:", error);
    connection.close();
  }

  connection.on('message', async (message) => {

    messageData = JSON.parse(message.toString());
    console.log("MESSAGEDATA", messageData)
    const { recipient, text } = messageData;
    console.log("MESSAGEDATA23456", recipient, text)
    if (recipient && text) {
      const messageDoc = await Message.create({
        senderId: connection.userId,
        recipientId: recipient,
        text,
      })
      console.log("MessageDoc", messageDoc)


      // [...wss.clients].filter(c => c.userId === recipient)
      //   .forEach(c => c.send(JSON.stringify({ text, sender: connection.userId })))


      // Array.from(wss.clients).filter(c => c.userId === recipient)
      //   .forEach(c => c.send(JSON.stringify({ text, sender: connection.userId, id: messageDoc.id, recipient })))

      Array.from(wss.clients)
        .filter(c => c.userId === recipient)
        .forEach(c => {
          console.log("Sending message to recipient:", recipient);
          console.log("Message content:", text);
          console.log("Sender:", connection.userId);
          console.log("Message ID:", messageDoc.id);
          console.log("Recipient:", recipient);

          c.send(JSON.stringify({ text, sender: connection.userId, id: messageDoc.id, recipient }));

          console.log("Message sent to recipient:", recipient);
        });



    }
  })



  //Notify everyone abount online people
  // [...wss.clients].forEach(client => {
  //   client.send(JSON.stringify({
  //     online: [...wss.clients].map(c => ({ userId: c.userId, username: c.username }))
  //   }));
  // })

  Array.from(wss.clients).forEach(client => {
    client.send(JSON.stringify({
      online: Array.from(wss.clients).map(c => ({ userId: c.userId, username: c.username }))
    }));
  })


  // console.log(
  //   "Number of user logged in ",
  //   [...wss.clients].map((c) => c.userEmail)
  // );
});
