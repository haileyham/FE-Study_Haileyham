const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => { //connection 이벤트핸들러, client가 server 연결될 때마다 실행 / socket 함수 내부에서 연결된 각 client 작업 수행, socket 객체는 연결된 개별 client이고 client와 server 통신 담당
    console.log(`User Connected : ${socket.id}`) // clent server 연결되면 고유 socket ID 출력

    socket.on("send_message", (data) => { // client에서 보낸 data
        console.log(data);
    })
})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})