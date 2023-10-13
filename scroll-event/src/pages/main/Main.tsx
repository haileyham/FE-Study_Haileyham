import { useNavigate } from 'react-router-dom';
import '../../styles/main.scss';
import React, { useEffect, useRef, useState } from 'react';
import { throttleUp } from '../../utils/throttleUp';

export default function Main() {
    const navigate = useNavigate();
    const [img, setImg] = useState(1);
    const targetRef = useRef<any>(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    //찍어보기
    window.addEventListener('scroll', function () {
        console.log(window.scrollY);
    });

    //sticky하는
    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition >= 1200) {
            setImg(2);
        } else {
            setImg(1);
        }
    };

    //useState / className 이용
    //지원안할수도있어서 추가
    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
        console.log(scrollPosition);
    };

    //실험useRef
    const hello = () => {
        if (targetRef.current) {
            targetRef.current.textContent = 'New Text';
        }
    };

    //300s마다
    const throttledScrollHandler = throttleUp(updateScroll, 300);

    ///Observer
    const targetRef2 = useRef(null);

    useEffect(() => {
        let observer = new IntersectionObserver((e) => {
            e.forEach((div) => {
                if (div.isIntersecting) {
                    div.target.classList.add('visible');
                    observer.unobserve(div.target);
                }
            });
        });

        if (targetRef2.current) {
            observer.observe(targetRef2.current);
        }
    }, []);

    //useEffect로
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', throttledScrollHandler);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', throttledScrollHandler);
        };
    }, []);

    return (
        <div style={{ height: '1000vh' }}>
            <div className="container">
                <div
                    className={
                        scrollPosition > 200 ? 'scrolled-text' : 'scroll-text'
                    }
                >
                    스크롤 시 색 변화 빠빰
                </div>
            </div>
            {/* sticky */}
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
            <div className="container">
                <h1
                    className={
                        scrollPosition > 3500 ? 'textMoving' : 'textMove'
                    }
                >
                    글자가 커진드아~
                </h1>
            </div>
            <div className="container">
                <div ref={targetRef2} className="hidden observer">
                    이 요소가 관찰 대상
                </div>
            </div>
            <div ref={targetRef}>이벤트 발생위치</div>
            <button onClick={hello}>Change Text</button>
        </div>
    );
}
