const mysql = require('mysql')
const { Sequelize } = require('sequelize')
const connection = mysql.createConnection({
    host: "40.114.69.227",
    user: "dotnet_SumitM",
    password: "LYqNqV4QKK8w",
    database: "dotnet_SumitM",
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection Successfull.......");
});

// const sequelize = new Sequelize(
//     "dotnet_SumitM",
//     "dotnet_SumitM",
//     "LYqNqV4QKK8w",
//     {
//         host: "40.114.69.227",
//         dialect: "mysql",
//     }
// );
const sequelize = new Sequelize(
    "mernchat",
    "root",
    "qwer?<>rewq567",
    {
        host: "localhost",
        dialect: "mysql",
    }
);
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

module.exports = sequelize;
