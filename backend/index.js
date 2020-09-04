const express = require("express");
const app = express();  
const http = require("http").createServer(app); 
const path = require('path');
const io = require("socket.io")(http);
app.use(express.static(path.join(__dirname, 'build')));

app.get("/",(req,res)=>res.sendFile(path.join(__dirname, 'build', 'index.html')) )

io.on("connection", socket=>{
    // console.log("A user has connected"); 
    socket.on("setSpeed",data=>socket.broadcast.emit("getSpeed",data));
    socket.on("setPosition",data=>socket.broadcast.emit("getPosition",data));
    socket.on("setFids",data=>socket.broadcast.emit("getFids",data));
    socket.on("setEncoder",data=>socket.broadcast.emit("getEncoder",data));
    socket.on("setPnumatic",data=>socket.broadcast.emit("getPnumatic",data));
    socket.on("setAutoState",data=>socket.broadcast.emit("getAutoState",data));
    socket.on("setEstop",data=>socket.broadcast.emit("getEstop",data)); 
    socket.on("setNext",data=>socket.broadcast.emit("getNext",data)); 
}); 

http.listen(process.env.PORT == undefined ? 8080:process.env.PORT, () => { 
    console.log(`listening on port ${process.env.PORT == undefined ? 8080:process.env.PORT}`);
});