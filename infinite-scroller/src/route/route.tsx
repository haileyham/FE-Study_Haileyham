import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from '../pages/list/List';
import Main from '../pages/main/Main';

export default function route():JSX.Element{
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/List" element={<List/>}/>
          <Route path="/Photo" element={<List/>}/>
        </Routes>
      </BrowserRouter>
  )
}
