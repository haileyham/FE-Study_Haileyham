import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';



export default function route() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Main/>} />
    </Routes>
</BrowserRouter>
  )
}
