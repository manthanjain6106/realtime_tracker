const express = require('express');
const app = express();
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
    console.log(`User connected: ${socket.id}`);
    
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });
    

    socket.on("disconnect", function () {
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-disconnect", socket.id);
    });
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
