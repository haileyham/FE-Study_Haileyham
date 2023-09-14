import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../../styles/main.scss';

export default function a() {
    let [list, setList] = useState<ASorN[]>([]);
    let [ref, inView] = useInView();
    let [page, setPage] = useState<number>(0);
    let [hasMoreData, setHasMoreData] = useState(true);

    interface ASorN {
        [key: string]: string | number;
    }
    const getList = async (): Promise<void> => {
        try {
            if (!hasMoreData) {
                return;
            }
            let response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_start=${page}&_limit=20`,
            );
            if (!response.ok) {
                throw new Error('네트워크 오류 발생');
            }
            let data = await response.json();
            if (data.length === 0) {
                setHasMoreData(false);
                return;
            }
            let combinedData = [...list, ...data];
            setList(combinedData);
            setPage((page) => page + 20);
        } catch (error) {
            console.log('에러발생:', error);
        }
    };

    useEffect(() => {
        if (inView) {
            getList();
        }
    }, [inView]);

    return (
        <>
            {list?.map((post) => {
                return (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                    </div>
                );
            })}
            <div ref={ref} style={{ visibility: 'hidden' }}></div>
            {!hasMoreData ? <p>불러올데이터없음</p> : <p>데이터 로딩중</p>}
        </>
    );
}
