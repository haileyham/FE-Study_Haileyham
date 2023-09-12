import React, { useEffect } from 'react';
import '../../styles/main.scss';
import { useInfiniteQuery } from 'react-query';
// import InfiniteScroll from 'react-infinite-scroller';

export default function Photo() {
    const fetchPhoto = async ({ pageParam = 1 }) => {
        try {
            const response = await fetch(
                `https://picsum.photos/v2/list?page=${pageParam}&limit=10`,
            );

            if (!response.ok) {
                throw new Error('네트워크 오류');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('에러 발생:', error);
            throw error;
        }
    };

    const { data, fetchNextPage, hasNextPage, isLoading, isError } =
        useInfiniteQuery('photoList', fetchPhoto, {
            getNextPageParam: (lastPage, allPages) => {
                // 페이지 파라미터 계산
                if (lastPage.page < 5) {
                    // 예시: 5 페이지 이하만 로드
                    return lastPage.page + 1;
                } else {
                    return undefined; // 모든 페이지 로드 완료
                }
            },
        });

    return (
        <>
            {/* <InfiniteScroll
      pageStart={0}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
      loader={<div className="loader" key={0}>Loading ...</div>}
    >
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((photo) => (
            <div key={photo.id}>
              <img src={photo.download_url} alt={`Photo ${photo.id}`} />
            </div>
          ))}
        </div>
      ))}
    </InfiniteScroll> */}
        </>
    );
}
