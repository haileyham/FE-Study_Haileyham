import './App.css';
import io from 'socket.io-client'; //socket.io 라이브러리에서 io함수 import / 서버와 통신
import { useEffect, useState } from 'react';

const socket = io.connect("http://localhost:3001") //back에서는 3000으로 front에서는 3001 / io.connect 함수 사용하여 server, socket 연결 / 주의할 점은 server와 client 간의 socket 통신을 위해 동일한 Socket.io 버전 사용해야 함

function App() {
    const [message, setMessage] = useState(""); //input 입력한 것 message에 담기
    const [messageReceived, setMessageReceived] = useState(""); //서버 수신 메시지
    const [room, setRoom] = useState(""); // 방 번호
    const [chatMessage, setChatMessage] = useState([]); // 모든 채팅 메시지 저장
    const [username, setUsername] = useState(""); // 사용자 닉네임


    // 전체 메시지 전달
    const sendMessage = () => {
        socket.emit("send_message", { message, user: username }); // socket.io 사용하여 client에서 server로 데이터 전송 / 첫번째 매개변수 이벤트 이름 지정, 두번째 매개변수로 데이터 전달
        // input으로 받은 message 서버로 전송
        setChatMessage([...chatMessage, { message, user: "YOU" }]);
        setMessage("");
    };

    // 방 접속
    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    }

    // 방 메시지 전달
    const sendMessageRoom = () => {
        socket.emit("send_message_Room", { message, room })
    }

    useEffect(() => {
        socket.on("receive_message", (data) => { //서버에서 보낸 것 수신
            setChatMessage([...chatMessage, { message: data.message, user: data.user }]) //서버에서 받은 것 messageReceived에 담기
        })
    }, [socket, chatMessage])

    return (
        <div className="App">
            <input
                placeholder="Your Nickname..."
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <input placeholder='Room Number...' type="number"
                onChange={(e) => { setRoom(e.target.value) }} />
            <button onClick={joinRoom}>Room</button>
            <h1>{room}</h1>
            <input placeholder="Message..."
                onChange={(e) => { setMessage(e.target.value) }} />
            <button onClick={sendMessage}>Send</button>
            {/* messageReceived 서버로부터 받은 것 보여주기 */}
            <button onClick={sendMessageRoom}>Room에만</button>
            <h1>Message : {messageReceived}</h1>
            <h1>{username}</h1>
            <div>
                {chatMessage.map((chat, i) => (
                    <div key={i}>
                        {/* {chat.user}: {chat.message} */}
                        {chat.user === username ? "YOU" : chat.user}: {chat.message}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;