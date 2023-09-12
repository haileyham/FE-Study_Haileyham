import { useEffect, useState } from 'react';
import '../../styles/main.scss';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query'; // react-query에서 필요한 훅을 가져오기

export default function Photo() {
    const [ref, inView] = useInView();
    const [page, setPage] = useState(1); // 페이지를 1로 초기화합니다.
    const [hasMoreData, setHasMoreData] = useState(true);

    // useQuery 훅을 사용하여 데이터를 가져오기
    // useQuery에서 사용하고 싶은 기능들을 구조 분해 할당하여 사용
    // data(데이터가져옴), isError(데이터 가져올때 오류여부 알려줌)
    // isLoading(데이터 가져오는중), isFetching(비동기쿼리 해결되지 않았음 의미)
    // error(에러메시지 보여줌) / 등등 공식문서 확인 필요
    const { data, isError, isLoading } = useQuery(
        // 첫 번째 인수(쿼리명 선언 / 고유한 키값이라 생각)
        // 쿼리키(어떠한 트리거가 있어야만 데이터를 다시 가져오게 됨)
        // 밑에처럼 photos, page의 경우 photos를 쿼리키로 지정하여, page가 업데이트 되면 리액트 쿼리가 새 쿼리를 만들고 staleTime과 cacheTime을 가짐
        ['photos', page], //쿼리식별자( useQuery 훅에 전달되는 첫 번째 매개변수로 사용되는 것을 의미)

        // 두 번째 인수(데이터 함수를 선언)
        async () => {
            if (!hasMoreData) {
                return [];
            }

            const response = await fetch(
                `https://picsum.photos/v2/list?page=${page}&limit=10`,
            );
            if (!response.ok) {
                throw new Error('오류다');
            }
            return response.json();
        },

        // 세 번째 인수(옵션, staleTime, cacheTime 사용 가능)
        {
            // enabled: inView, // inView가 true일 때만 쿼리를 실행
            keepPreviousData: false, // 이전 데이터를 유지
            onSuccess: (data) => {
                // useQuery 훅이 내부적으로 비동기 요청을 수행하고 데이터를 가져온 결과
                console.log(data);
                // if (data.length > 0) {
                //     setPage((prevPage) => prevPage + 10);
                // }
            },
        },
    );

    useEffect(() => {
        if (inView && hasMoreData) {
            // inView가 true이고 데이터를 더 가져올 수 있는 경우
            setPage((prevPage) => prevPage + 10); // 페이지를 증가시켜 새로운 데이터를 가져오도록 함
        }
    }, [inView, hasMoreData]);

    // 무한 스크롤 중에 데이터를 가져오는 동안 로딩 상태를 표시
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // 데이터 가져오기에 실패한 경우 오류 메시지를 표시
    if (isError) {
        return <p>Error fetching data</p>;
    }

    // if (!data || data.length === 0) {
    //     return <p>No data available</p>;
    // }

    return (
        <>
            {data.map((photo: { id: number; download_url: string }) => {
                return (
                    <div key={photo.id} className="PhotoBox">
                        <img src={photo.download_url as string} alt="" />
                    </div>
                );
            })}
            <div ref={ref}>ddd</div>
        </>
    );
}
