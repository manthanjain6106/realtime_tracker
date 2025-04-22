const express = require('express');
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path")


const server = http.createServer(app);

const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res)=>{
    res.send("server is running")
});


server.listen(3000);