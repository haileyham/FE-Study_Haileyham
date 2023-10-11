import { useNavigate } from 'react-router-dom';
import '../../styles/main.scss';
import React, { useEffect, useState } from 'react';

export default function Main() {
    const navigate = useNavigate();
    const [img, setImg] = useState(1);

    window.addEventListener('scroll', function () {
        console.log(window.scrollY);
    });

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition >= 1200) {
            setImg(2);
        } else {
            setImg(1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div style={{ height: '1000vh' }}>
            <div className="box">
                <img
                    src={process.env.PUBLIC_URL + `/${img}.jpg`}
                    className="image"
                    alt="adventure"
                />
                <div style={{ clear: 'both' }}></div>
                <div className="text">
                    hellohellohellohellohellohe
                    llohellohellohellohellohellohello hellohellohellohellohello
                </div>
                <div style={{ clear: 'both' }}></div>
                <div className="text">
                    hellohellohellohellohellohe
                    llohellohellohellohellohellohello hellohellohellohellohello
                </div>
                <div style={{ clear: 'both' }}></div>
                <div className="text">
                    hellohellohellohellohellohe
                    llohellohellohellohellohellohello hellohellohellohellohello
                </div>
                <div style={{ clear: 'both' }}></div>
                <div className="text">
                    hellohellohellohellohellohe
                    llohellohellohellohellohellohello hellohellohellohellohello
                </div>
            </div>
        </div>
    );
}
