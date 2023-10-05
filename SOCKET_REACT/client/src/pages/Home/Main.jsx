import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { styled } from 'styled-components';

// 이미지 상대 경로 설정
const imagePath = process.env.PUBLIC_URL + '/172444.webp';



export default function Main() {
    const navigate = useNavigate();

    const [username, setUsername] = useState(""); // 사용자 닉네임
    const [room, setRoom] = useState(""); // 방 번호

    return (
        <>
            <MainContainer >
                <Nav>
                    <Logo onClick={() => { navigate('/') }}>👻 CHAT</Logo>
                    <NavA onClick={() => { navigate('/') }}>Home</NavA>
                    <NavA onClick={() => { navigate('/chat') }}>채팅목록</NavA>
                    <NavA>게시판</NavA>
                    <NavA>앨범</NavA>
                </Nav>
                <IntoChatContainer1>
                </IntoChatContainer1>
                <IntoChatContainer2>
                    <WrapInputBtn>
                        <RoomNumberInput placeholder='방번호 입력' type="number" onChange={(e) => { setRoom(e.target.value) }}></RoomNumberInput>
                        <UsernameInput placeholder='닉네임 입력' onChange={(e) => { setUsername(e.target.value) }}></UsernameInput>
                        <Link to={`/chattingRoom?username=${username}&room=${room}`}>
                            <IntoChatRoomBtn>채팅방 입장</IntoChatRoomBtn>
                        </Link>
                    </WrapInputBtn>
                </IntoChatContainer2>
            </MainContainer>
        </>
    )
}

const MainContainer = styled.main`
    margin:0;
    box-sizing: border-box;
`

const Nav = styled.nav`
    /* background: red; */
    display:flex;
    gap:1rem;
    text-align: center;
    align-items: center;
    box-sizing: border-box;
`

const Logo = styled.span`
    font-weight: 900;
    font-size: 1.3rem;
    flex-grow:2;
    cursor: pointer;
`

const NavA = styled.a`
    padding: 2rem;
    text-decoration: none;
    flex-grow: 1;
    cursor: pointer;
    position: relative;
    &::before {
        content: '';
        position: absolute;
        bottom: 1rem;
        left: 50%; /* 중앙부터 시작 */
        width: 0;
        height: 2px;
        background: #3f3f3f; /* 라인 색상 설정 */
        transition: width 0.3s ease; /* 애니메이션 효과 설정 */
        transform: translateX(-50%); /* 중앙 정렬 */
    }
    &:hover::before {
        width: 70%; /* 호버 시 라인이 중앙부터 퍼지도록 설정 */
    }
`

const IntoChatContainer1 = styled.div`
    background-image: url('${imagePath}');
    background-size: cover;
    background-position:center bottom;
    margin: 2rem auto;
    max-width: 1200px;
    height:22rem;
`

const IntoChatContainer2 = styled.div`
    margin:auto;
    max-width: 1200px;
    height:10rem;
    /* background-color: #ffebeb; */
    margin-top:2rem;
    margin-bottom:20rem;
    display: flex;
    justify-content: center; 
    align-items: center; 
`

const WrapInputBtn = styled.div`
    display:flex;
    gap:10px;
    height:30px;
    align-items: center;
    font-size: 1rem;
`
const UsernameInput = styled.input`
    border-radius: 5px;
    border:  #ffebeb solid 5px;
    outline: none;
    padding:2rem;
`
const RoomNumberInput = styled.input`
    border-radius: 5px;
    border:  #ffebeb solid 5px;
    outline: none;
    padding:2rem;
    width:100px;
`
const IntoChatRoomBtn = styled.button`
    background: #ffe0e5;
    border-radius: 5px;
    border: none;
    padding:2rem;
    cursor: pointer;
    &:hover{
        background: pink;
    }
`
