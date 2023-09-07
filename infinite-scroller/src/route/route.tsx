import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function route():JSX.Element{
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>hello</div>}/>
        </Routes>
      </BrowserRouter>
  )
}
