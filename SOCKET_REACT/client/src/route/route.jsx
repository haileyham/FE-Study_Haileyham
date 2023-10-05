import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from '../pages/Home/Main';
import Chat from '../pages/chat/Chat';

export default function route() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    )
}
