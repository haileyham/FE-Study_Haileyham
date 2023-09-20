import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';
import Searching from '../pages/search/Search';
import List from '../pages/list/List';

export default function route() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/list" element={<List />} />
                <Route path="/search" element={<Searching />} />
            </Routes>
        </BrowserRouter>
    );
}
