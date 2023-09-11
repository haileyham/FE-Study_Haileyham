import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../../styles/main.scss';

export default function List(): JSX.Element {
    const [ref, inView] = useInView();
    const [page, setPage] = useState(0);
    // const [products, setProducts] = useState<string[]>([]);
    const [item, setItem] = useState<ASorN[]>([]); // 초기값을 null로 설정하고 객체 또는 null을 허용
    const [hasMoreData, setHasMoreData] = useState(true);

    interface ASorN {
        [key: string]: string | number;
    }

    // const repeat = () => {
    //     const repeatHello: string[] = Array(300).fill('hello');
    //     setProducts(repeatHello);
    // };

    const apiget = async (): Promise<void> => {
        try {
            if (!hasMoreData) {
                // 더 이상 데이터를 불러올 수 없으면 함수 종료
                return;
            }

            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_start=${page}&_limit=50`,
            );
            if (!response.ok) {
                throw new Error('네트워크 오류'); // 오류 처리 예제
            }
            const data: ASorN[] = await response.json();
            console.log(data);

            if (data.length === 0) {
                // 더 이상 데이터가 없으면 hasMoreData를 false로 설정하여 무한 스크롤을 중지
                setHasMoreData(false);
                return;
            }

            // const combinedData = [...item, ...data];
            const combinedData = item.concat(data);
            setItem(combinedData);
            setPage((page) => page + 50);
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    useEffect(() => {
        if (inView) {
            console.log(inView, 'hello');
            apiget();
        }
    }, [inView]);

    return (
        <>
            {/* <button onClick={repeat}>click</button> */}
            {/* <button onClick={apiget}>click</button> */}
            {/* {products?.map((a) => { return <div>{a}</div>})} */}
            <div className="CardBox">
                {item?.map((post) => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                ))}
                <div ref={ref} style={{ visibility: 'hidden' }}></div>
                {!hasMoreData ? <p>끝! 더 이상 불러올 데이터가 없옹~</p> : 0}
            </div>
        </>
    );
}
