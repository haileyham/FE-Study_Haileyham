import '../../styles/main.scss';
import Search from '../../components/search/search';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();

    return (
        <>
            <Search />;
            <div
                className="searchBox"
                onClick={() => {
                    navigate('/search');
                }}
            >
                search
            </div>
            ;
        </>
    );
}
