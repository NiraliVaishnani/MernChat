const express = require("express");
const app = express();
const sequelize = require("./db");
const port = 5000;
const Register = require("./models/register");
const LoginAttempt = require("./models/LoginAttempt");
const Registerroutes = require("./routes/register");
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
// wss.on("connection", (connection, req) => {
//   console.log("Connection established");
//   // Retrieve the token from the WebSocket handshake headers
//   const token = req.headers["sec-websocket-protocol"];
//   console.log("pppp", token);
//   try {
//     const decoded = jwt.verify(token, "nirali");
//     console.log("Decoded token:", decoded); // Log the decoded payload
//     // Rest of the code for authenticated connection
//   } catch (error) {
//     console.error("JWT verification error:", error);
//     connection.close();
//   }
//   // if (token) {
//   //   jwt.verify(token, "nirali", (err, decoded) => {
//   //     if (err) {
//   //       console.error("WebSocket authentication error:", err);
//   //       connection.close();
//   //     } else {
//   //       const userEmail = decoded.email;
//   //       console.log("WebSocket connection authenticated:", userEmail);

//   //       // Associate the connection with the user's email
//   //       connectedUsers[userEmail] = connection;

//   //       connection.on("message", (message) => {
//   //         console.log(`Received message from ${userEmail}: ${message}`);
//   //         // Broadcast the message to all connected clients
//   //         wss.clients.forEach((client) => {
//   //           if (client !== connection && client.readyState === WebSocket.OPEN) {
//   //             client.send(`${userEmail}: ${message}`);
//   //           }
//   //         });
//   //       });
//   //       connection.on("close", () => {
//   //         console.log(`Connection closed for ${userEmail}`);
//   //         // Remove the user's connection from the data structure
//   //         delete connectedUsers[userEmail];
//   //       });
//   //     }
//   //   });
//   // } else {
//   //   console.error("WebSocket connection without authentication token");
//   //   connection.close();
//   // }
// });
wss.on("connection", (connection, req) => {
  console.log("Connection established");
  // Retrieve the token from the WebSocket handshake headers
  const tokenWithPrefix = req.headers["sec-websocket-protocol"];
  const token = tokenWithPrefix.replace("logintoken, ", ""); // Remove the prefix
  console.log("Received token:", token); // Log the extracted token
  try {
    const decoded = jwt.verify(token, "nirali");
    console.log("Decoded token:", decoded); // Log the decoded payload
    const userEmail = decoded.email;
    console.log("UserEmail", userEmail);
    // Associate the connection with the user's email
    connection.userEmail = userEmail;

    // Rest of the code for authenticated connection
  } catch (error) {
    console.error("JWT verification error:", error);
    connection.close();
  }
  console.log(
    "Number of user logged in ",
    [...wss.clients].map((c) => c.userEmail)
  );
});
