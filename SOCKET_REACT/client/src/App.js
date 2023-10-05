import './App.css';
import io from 'socket.io-client'; //socket.io 라이브러리에서 io함수 import / 서버와 통신
import { useEffect } from 'react';

const socket = io.connect("http://localhost:3001") //back에서는 3000으로 front에서는 3001 / io.connect 함수 사용하여 server, socket 연결 / 주의할 점은 server와 client 간의 socket 통신을 위해 동일한 Socket.io 버전 사용해야 함

function App() {
    const sendMessage = () => {
        socket.emit("send_message", { message: "Hello" }); // socket.io 사용하여 client에서 server로 데이터 전송 / 첫번째 매개변수 이벤트 이름 지정, 두번째 매개변수로 데이터 전달
    };

    useEffect(() => {
        socket.on("receive_message", (data) => { //서버에서 보낸 것 수신
            alert(data.message);
        })
    }, [socket])

    return (
        <div className="App">
            <input placeholder="Message..." />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
