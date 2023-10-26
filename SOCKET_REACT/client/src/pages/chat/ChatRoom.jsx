import React from 'react'
import io from 'socket.io-client'; //socket.io 라이브러리에서 io함수 import / 서버와 통신
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';


const socket = io.connect("http://localhost:3001") //back에서는 3000으로 front에서는 3001 / io.connect 함수 사용하여 server, socket 연결 / 주의할 점은 server와 client 간의 socket 통신을 위해 동일한 Socket.io 버전 사용해야 함

export default function ChatRoom(props) {
  const [message, setMessage] = useState(""); //input 입력한 것 message에 담기
  // const [messageReceived, setMessageReceived] = useState(""); //서버 수신 메시지
  const [chatMessage, setChatMessage] = useState([]); // 모든 채팅 메시지 저장

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');
  const room = searchParams.get('room');


  // 전체 메시지 전달
  const sendMessage = () => {
    socket.emit("send_message", { message, user: username }); // socket.io 사용하여 client에서 server로 데이터 전송 / 첫번째 매개변수 이벤트 이름 지정, 두번째 매개변수로 데이터 전달 // input으로 받은 message 서버로 전송
    setChatMessage([...chatMessage, { message, user: username }]);//모든 채팅 메시지 저장하기 위해서 배열로 저장 / 기존것에 input message 입력한 것과 user 구분
    setMessage(""); //input 입력하는 메시지 useState는 초기화
    console.log(chatMessage)

  };

  // 방 접속
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const messageWithTime = `${currentHour}:${currentMinute}`;

  // 방 메시지 전달
  const sendMessageRoom = () => {
    if (message.trim() === '') {
      alert('빈값안됨')
      return;
    } else {
      socket.emit("send_message_Room", { message, room, user: username, time: messageWithTime })
      setChatMessage([...chatMessage, { message, user: username, time: messageWithTime }]);//모든 채팅 메시지 저장하기 위해서 배열로 저장 / 기존것에 input message 입력한 것과 user 구분
      setMessage(""); //input 입력하는 메시지 useState는 초기화
      console.log(chatMessage)
    }
  }

  // input 창 enter 키 눌러서 Room으로 메시지 전달 (form 태그 안에 button 태그 type="submit" 방전달에만 달았음)
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 중단
    // 폼 제출 시 수행할 로직을 여기에 추가
    // if (message.trim() === '') {
    //   alert('안돼앵')
    // }
  }

  // 방입장
  const notifyUserJoin = () => {
    socket.emit("user_join", { room, user: username });
  }

  useEffect(() => {
    joinRoom();
    notifyUserJoin();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => { //서버에서 보낸 것 수신
      setChatMessage([...chatMessage, { message: data.message, user: data.user, time: messageWithTime }]) //서버에서 받은 것 messageReceived에 담기
    })
    // console.log(chatMessage)
  }, [socket, chatMessage])

  return (
    <div className="App">
      <ChattingContainer>
        <Header>
          <Heading>Room : {room}</Heading>
          <p>myname : {username}</p>
        </Header>
        <MessageList>
          <p style={{ color: "#525252" }}>- <strong>{username}</strong>님 <strong>{room}</strong>번방에 오신 것을 환영합니다. 자유롭게 대화를 나누세요. -</p>
          {chatMessage.map((chat, i) => (
            <div key={i}>
              {chat.user === "관리자" ?
                <SystemMessage>{chat.message} </SystemMessage> : chat.user === username ?
                  <>
                    <MessageMe>
                      <UsernameMe>You</UsernameMe>
                      {chat.message}
                      <TimeMe>{chat.time}</TimeMe>
                    </MessageMe>
                  </>
                  :
                  <>
                    <MessageSomeone>
                      <UsernameSomeone>{username}</UsernameSomeone>
                      {chat.message}
                      <TimeSomeone>{chat.time}</TimeSomeone>
                    </MessageSomeone>
                  </>
              }
            </div>
          ))}
        </MessageList>
      </ChattingContainer>
      <ChattingBox onSubmit={handleSubmit}>
        <ChattingInput placeholder="Message..."
          onChange={(e) => { setMessage(e.target.value) }}
          value={message}
        />
        <ChattingSendBtn onClick={sendMessage}>Send</ChattingSendBtn>
        {/* messageReceived 서버로부터 받은 것 보여주기 */}
        <ChattingSendBtn type="submit" onClick={sendMessageRoom}>Room에만</ChattingSendBtn>
      </ChattingBox>
    </div>
  );
}


const ChattingContainer = styled.div`
    height:100vh;
    background-color: #ffeded;
`

const Header = styled.header`
    height:10vh;
    background-color: #ffd6d6;
    display:flex;
    justify-content: space-around;
    align-items: center;
`

const Heading = styled.h1`
    margin: 0;
    padding: 0;
`;

const ChattingBox = styled.form`
    position: absolute;
    bottom: 0;
    display: flex;
    gap: 0.3rem;
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
    background-color: #ff7878;
`;

const ChattingInput = styled.input`
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    flex-grow: 1;
    &:focus {
        outline: none;
    }
`;

const ChattingSendBtn = styled.button`
    background-color: #f8d5d5;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const MessageList = styled.ul`
    list-style: none;
    /* background-color: #ffffff; */
    margin: 0;
    padding: 0;
    height:85%;
    overflow-y: auto;
    display:flex;
    flex-direction: column;
    color:#fff;
`;

const MessageMe = styled.li`
    padding: 1rem;
    background-color: #cebaf1;
    border-radius: 10px;
    width:80%;
    margin-left: auto; /* 오른쪽 정렬을 위한 설정 */
    margin-right:10px;
    margin-top:40px;
    position: relative;
`;

const MessageSomeone = styled.li`
    padding: 1rem;
    background-color: #c29de8;
    border-radius: 10px;
    width:80%;
    margin-right: auto; /* 왼쪽 정렬을 위한 설정 */
    margin-left:10px;
    margin-top:40px;
    position: relative;
`;

const TimeMe = styled.span`
    color:#797979;
    position: absolute;
    left:-50px;
    top:17px;
`

const TimeSomeone = styled.span`
    color:#797979;
    position: absolute;
    right:-50px;
    top:17px;
`

const UsernameMe = styled.p`
    color:#797979;
    position: absolute;
    right:10px;
    top:-40px;
    `

const UsernameSomeone = styled.p`
    color:#797979;
    position: absolute;
    left:10px;
    top:-40px;
`

const SystemMessage = styled.li`
    color:#797979;
    line-height: 2rem;
    margin-top:10px;
`