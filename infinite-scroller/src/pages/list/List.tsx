import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../../styles/main.scss';

export default function List(): JSX.Element {
    const [ref, inView] = useInView();
    const [page, setPage] = useState(10);
    const [products, setProducts] = useState<string[]>([]);
    const [item, setItem] = useState<ASorN[]>([]); // 초기값을 null로 설정하고 객체 또는 null을 허용

    interface ASorN {
        [key: string]: string | number;
    }

    // const repeat = () => {
    //     const repeatHello: string[] = Array(300).fill('hello');
    //     setProducts(repeatHello);
    // };

    const apiget = async (): Promise<void> => {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts?_start=0&_limit=${page}`,
            );
            if (!response.ok) {
                throw new Error('네트워크 오류'); // 오류 처리 예제
            }
            const data: ASorN[] = await response.json();
            console.log(data);
            setItem(data);
            setPage((page) => page + 10);
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
                <div ref={ref}>ref다 이거보이묜 hello출력!</div>
            </div>
        </>
    );
}
