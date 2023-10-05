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

    // 모두에게 보내기
    socket.on("send_message", (data) => { // client에서 보낸 data
        // console.log(data);
        socket.broadcast.emit("receive_message", data); // server에서 client로 메시지 전송 / 메시지 보낸 client에는 안 보내고, 다른 모든 client는 수신
    })

    // 방에 입장하기
    socket.on("join_room", (data) => {
        socket.join(data)
    })

    // 방에만 보내기
    socket.on("send_message_Room", (data) => {
        socket.to(data.room).emit("receive_message", data)
    })
})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING")
})