import express from "express";
import { join, dirname } from 'path';
// import TestDataPoint from "./models.js";
import { createServer } from "http";
import Sock from "socket.io";
const app = express();
const http = createServer(app);
const io = Sock(http);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    next();
});

const moduleURL = new URL(import.meta.url);
const __dirname = dirname(moduleURL.pathname);
app.use(express.static(join(__dirname, 'build')));


const brodcastAndPersist = async (name, data, socket) => {
    socket.broadcast.emit(name, data);
    // TestDataPoint.createBatch(name.substring(3), data); 
}

app.get("/", (req, res) => res.sendFile(join(__dirname, 'build', 'index.html')));
app.get("/searchLogs", (req, res) => res.sendFile(join(__dirname, 'build', 'index.html')));

// app.get("/getNames", async (req, res) => res.send(await TestDataPoint.getUniqueNames())) 

// app.get("/getData", async (req, res) => res.send(await TestDataPoint.getData(req.query.start, req.query.end, req.query.names)));

io.on("connection", socket => {
    console.log("connected"); 

    socket.on("setSpeed", data => brodcastAndPersist("getSpeed", data, socket));
    socket.on("setPosition", data => brodcastAndPersist("getPosition", data, socket));
    socket.on("setFids", data => brodcastAndPersist("getFids", data, socket));
    socket.on("setFid1", data => brodcastAndPersist("getFid1", data, socket));
    socket.on("setFid2", data => brodcastAndPersist("getFid2", data, socket));
    socket.on("setEncoder", data => brodcastAndPersist("getEncoder", data, socket));
    socket.on("setLoadCell", data => brodcastAndPersist("getLoadCell", data, socket));
    socket.on("setPnumatic", data => brodcastAndPersist("getPnumatic", data, socket));
    socket.on("setAutoState", data => socket.broadcast.emit("getAutoState", data));
    socket.on("Estop", data => socket.broadcast.emit("setEstop", data));
    socket.on("setNext", data => socket.broadcast.emit("setNext", data));
});

http.listen(process.env.PORT == undefined ? 8080 : process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT == undefined ? 8080 : process.env.PORT}`);
});