import { useNavigate } from 'react-router-dom';
import '../../styles/main.scss';
import React, { useEffect } from 'react';

export default function Main() {
    const navigate = useNavigate();

    window.addEventListener('scroll', function () {
        console.log(window.scrollY);
    });

    return (
        <div style={{ height: '1000vh' }}>
            <div className="box">
                <img
                    src={process.env.PUBLIC_URL + '/1.jpg'}
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
