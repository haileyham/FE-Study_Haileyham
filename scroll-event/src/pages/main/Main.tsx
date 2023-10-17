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
        if (scrollPosition >= 2600) {
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

    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        let observer = new IntersectionObserver((e) => {
            e.forEach((div) => {
                if (div.isIntersecting) {
                    setIsVisible(true);
                } else {
                    // 요소가 화면에서 사라졌을 때
                    setIsVisible(false);
                }
            });
        });

        if (targetRef2.current) {
            observer.observe(targetRef2.current);
        }

        return () => {
            // 컴포넌트가 언마운트될 때 옵저버 해제
            observer.disconnect();
        };
    }, []);

    const [progressBar, setProgressBar] = useState<number>();

    // scroll progress bar
    const progress = () => {
        const totalPageHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
        );
        const percent =
            (window.scrollY / (totalPageHeight - window.innerHeight)) * 100;
        console.log(percent);
        setProgressBar(percent);
    };

    //useEffect로
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', throttledScrollHandler);
        window.addEventListener('scroll', progress);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', throttledScrollHandler);
            window.removeEventListener('scroll', progress);
        };
    }, []);

    // 네비게이션 메뉴 항목 클릭 시 해당 위치로 스크롤
    const scrollToPosition = (position: any) => {
        window.scrollTo({
            top: position,
            behavior: 'smooth',
        });
    };

    // 네비게이션 메뉴 항목 클릭 핸들러
    const handleMenuClick = (position: any) => {
        scrollToPosition(position);
    };

    return (
        <div style={{ height: '1000vh' }}>
            {scrollPosition > 500 ? (
                <>
                    <nav
                        className={`navbar ${
                            scrollPosition > 900 ? 'navbar-fade-in' : ''
                        }`}
                    >
                        <span onClick={() => handleMenuClick(220)}>히히히</span>
                        <span onClick={() => handleMenuClick(2000)}>
                            쿄쿄쿄
                        </span>
                        <a href="#here">킝킝킝</a>
                    </nav>
                    <div
                        className={scrollPosition > 900 ? 'progressBar' : ''}
                        style={{
                            width: `${progressBar}%`,
                        }}
                    ></div>
                </>
            ) : (
                ''
            )}
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
                <div
                    ref={targetRef2}
                    className={isVisible ? 'visible observer' : 'hidden '}
                    id="here"
                >
                    이 요소가 관찰 대상
                </div>
            </div>
            <div ref={targetRef}>이벤트 발생위치</div>
            <button onClick={hello}>Change Text</button>
        </div>
    );
}
