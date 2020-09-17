import express from "express";
import { join, dirname } from 'path';
import TestDataPoint from "./models.js";
import { createServer } from "http";
import Sock from "socket.io";
const app = express();
const http = createServer(app);
const io = Sock(http);

const moduleURL = new URL(import.meta.url);
const __dirname = dirname(moduleURL.pathname);
app.use(express.static(join(__dirname, 'build')));


const brodcastAndPersist = async (name, data, socket) => {
    socket.broadcast.emit(name, data);
    TestDataPoint.createBatch(name.substring(3), data); 
}

app.get("/", (req, res) => res.sendFile(join(__dirname, 'build', 'index.html')));
app.get("/searchLogs", (req, res) => res.sendFile(join(__dirname, 'build', 'index.html')));

app.get("/getNames", async (req, res) => res.send(await TestDataPoint.getUniqueNames())) 

app.get("/getData", async (req, res) => res.send(await TestDataPoint.getData(req.query.start, req.query.end, req.query.names)));

io.on("connection", socket => {

    socket.on("setSpeed", data => brodcastAndPersist("getSpeed", data, socket));
    socket.on("setPosition", data => brodcastAndPersist("getPosition", data, socket));
    socket.on("setFids", data => brodcastAndPersist("getFids", data, socket));
    socket.on("setEncoder", data => brodcastAndPersist("getEncoder", data, socket));
    socket.on("setPnumatic", data => brodcastAndPersist("getPnumatic", data, socket));
    socket.on("setAutoState", data => socket.broadcast.emit("getAutoState", data));
    socket.on("setEstop", data => socket.broadcast.emit("getEstop", data));
    socket.on("setNext", data => socket.broadcast.emit("getNext", data));
});

http.listen(process.env.PORT == undefined ? 8080 : process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT == undefined ? 8080 : process.env.PORT}`);
});