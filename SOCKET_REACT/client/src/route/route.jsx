import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from '../pages/Home/Main';
import Chat from '../pages/chat/Chat';
import ChatRoom from '../pages/chat/ChatRoom';

export default function route() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chattingRoom" element={<ChatRoom />} />
            </Routes>
        </BrowserRouter>
    )
}
