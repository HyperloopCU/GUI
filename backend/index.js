const express = require("express");
const app = express();  
const http = require("http").createServer(app); 
const path = require('path');
const redis = require("redis");
const io = require("socket.io")(http);
const {TestDataPoint} = require("./models"); 

app.use(express.static(path.join(__dirname, 'build')));

// let client = redis.createClient(6379, 'redis'); 

const brodcastAndPersist = async (name,data,socket)=>{
    socket.broadcast.emit(name,data); 
    TestDataPoint.createBatch(name.substring(3),data); // implement redis stuff here 
}

app.get("/",(req,res)=>res.sendFile(path.join(__dirname, 'build', 'index.html')) ); 

app.get("/readData",async (req,res)=>console.log(await TestDataPoint.findAll())) // run curl localhost:8080/readData and it will print out all the data points (this is for testing)

io.on("connection", socket=>{
    // console.log("A user has connected"); 
    socket.on("setSpeed",data=>brodcastAndPersist("getSpeed",data,socket));
    socket.on("setPosition",data=>brodcastAndPersist("getPosition",data,socket));
    socket.on("setFids",data=>brodcastAndPersist("getFids",data,socket));
    socket.on("setEncoder",data=>brodcastAndPersist("getEncoder",data,socket));
    socket.on("setPnumatic",data=>brodcastAndPersist("getPnumatic",data,socket));
    socket.on("setAutoState",data=>brodcastAndPersist("getAutoState",data,socket));
    socket.on("setEstop",data=>socket.broadcast.emit("getEstop",data)); 
    socket.on("setNext",data=>socket.broadcast.emit("getNext",data)); 
}); 

http.listen(process.env.PORT == undefined ? 8080:process.env.PORT, () => { 
    console.log(`listening on port ${process.env.PORT == undefined ? 8080:process.env.PORT}`);
});