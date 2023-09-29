import React, { useEffect, useState } from 'react';
import config from '../../api/config.json';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/main.scss';
import useDebounce from '../../hooks/useDebounce';
import { getSessionData, setSessionData } from '../../utils/sessionStorage';

// XML 파싱한 것 json으로 변환해서 사용하기
export default function Searching(): JSX.Element {
    const [eventData, setEventData] = useState<CulturalEvent[]>([]);
    const [eventDataReco, setEventDataReco] = useState<CulturalEvent[]>([]);
    interface CulturalEvent {
        [key: string]: string | null | undefined;
    }

    const [title, setTitle] = useState<string>('');

    const debounced = useDebounce(title, 400);

    const [searchIndex, setSearchIndex] = useState<number>(-1);
    const [selectedRecommendationIndex, setSelectedRecommendationIndex] =
        useState<number>(-1);

    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const [실험, set실험] = useState<number | null | undefined>();

    const get = async (): Promise<void> => {
        if (!debounced) {
            // 검색어가 비어있을 경우 아무 작업도 하지 않음
            return;
        }

        const existingData = getSessionData(debounced);
        if (existingData) {
            console.log(existingData);
            setEventData(existingData);
            setEventDataReco(existingData); //따로
        } else {
            try {
                // const apiKey = process.env.REACT_APP_API_KEY;
                // console.log(apiKey);
                const apiKey2 = config.api_key;
                const response = await fetch(
                    `http://openapi.seoul.go.kr:8088/${apiKey2}/xml/culturalEventInfo/1/1000/ /${debounced}`, // 띄어쓰기 해야 TITLE 검색 가능 / 옵션1(분류) / 옵션2(공연/행사명) / 옵션3(날짜/시간 YYYY-MM-DD)
                    //한번에 최대 1000개까지 호출가능(총데이터수 약3600개)
                    //옛날것도 가져오는 것 같군 / 추후 시간 조정해야겠다
                );
                if (!response.ok) {
                    throw new Error('오류');
                }
                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

                const culturalEvents: CulturalEvent[] = [];

                interface CulturalEvent {
                    [key: string]: string | null | undefined;
                }

                const rowElements = xmlDoc.querySelectorAll('row');
                // console.log(rowElements);
                rowElements.forEach((rowElement) => {
                    const culturalEvent = {
                        //key값 주기위해서 id부여
                        id: uuidv4(), // UUID를 사용한 고유한 식별자
                        CODENAME:
                            rowElement.querySelector('CODENAME')?.textContent,
                        GUNAME: rowElement.querySelector('GUNAME')?.textContent,
                        TITLE: rowElement.querySelector('TITLE')?.textContent,
                        DATE: rowElement.querySelector('DATE')?.textContent,
                        PLACE: rowElement.querySelector('PLACE')?.textContent,
                        ORG_NAME:
                            rowElement.querySelector('ORG_NAME')?.textContent,
                        USE_TRGT:
                            rowElement.querySelector('USE_TRGT')?.textContent,
                        USE_FEE:
                            rowElement.querySelector('USE_FEE')?.textContent,
                        PLAYER: rowElement.querySelector('PLAYER')?.textContent,
                        PROGRAM:
                            rowElement.querySelector('PROGRAM')?.textContent,
                        ETC_DESC:
                            rowElement.querySelector('ETC_DESC')?.textContent,
                        ORG_LINK:
                            rowElement.querySelector('ORG_LINK')?.textContent,
                        MAIN_IMG:
                            rowElement.querySelector('MAIN_IMG')?.textContent,
                        RGSTDATE:
                            rowElement.querySelector('RGSTDATE')?.textContent,
                        TICKET: rowElement.querySelector('TICKET')?.textContent,
                        STRTDATE:
                            rowElement.querySelector('STRTDATE')?.textContent,
                        END_DATE:
                            rowElement.querySelector('END_DATE')?.textContent,
                        THEMECODE:
                            rowElement.querySelector('THEMECODE')?.textContent,
                        LOT: rowElement.querySelector('LOT')?.textContent,
                        LAT: rowElement.querySelector('LAT')?.textContent,
                        IS_FREE:
                            rowElement.querySelector('IS_FREE')?.textContent,
                        HMPG_ADDR:
                            rowElement.querySelector('HMPG_ADDR')?.textContent,
                    };

                    culturalEvents.push(culturalEvent);
                });
                console.log(culturalEvents);
                setEventData(culturalEvents);
                // console.log(eventData);
                setEventDataReco(culturalEvents); // 따로빼서
                setSessionData(debounced, culturalEvents);
            } catch (error) {
                console.log('에러발생:', error);
            }
        }
    };

    useEffect(() => {
        if (debounced) {
            get();
        }
    }, [debounced]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        setTitle(e.target.value);
        setSelectedRecommendationIndex(-1); // 검색어 입력 시 추천 검색어 선택 인덱스 초기화
        setButtonClicked(false);
        setSearchIndex(-1);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            console.log('헬로');
            get();
            const searchA = document.querySelector(
                '#searchA',
            ) as HTMLElement | null;
            if (searchA) {
                searchA.click();
            }
        }
        if (e.key === 'Tab') {
            console.log('Tab');
        }
        if (e.key === 'ArrowDown') {
            // console.log('아래');
            setSearchIndex((a) => (a !== eventDataReco.length ? a + 1 : 0));
        }
        if (e.key === 'ArrowUp') {
            // console.log('위');
            setSearchIndex((a) => (a !== 0 ? a - 1 : eventDataReco.length));
        }
        // console.log(e.code);
    };
    // console.log(eventDataReco);
    // console.log(eventData);

    return (
        <>
            <div className="searchContainer">
                <header className="searchHeader">
                    <h1>찾아보자!</h1>
                    {/* {eventDataReco ? eventDataReco[searchIndex]?.TITLE : ''}
                    {eventDataReco && eventDataReco[searchIndex]?.TITLE} */}
                    <div className="searchReco">
                        <input
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            type="text"
                            value={
                                searchIndex >= 0 &&
                                !buttonClicked &&
                                eventDataReco[searchIndex]?.TITLE
                                    ? (eventDataReco[searchIndex]
                                          ?.TITLE as string)
                                    : (title as string)
                            }
                        />
                        {debounced ? (
                            <ul className="searchRecommendBox">
                                {title &&
                                eventDataReco &&
                                eventDataReco.length > 0 ? (
                                    eventDataReco.map((data, i) => {
                                        const recommendationText =
                                            data.TITLE || '';
                                        const startIndex = recommendationText
                                            .toLowerCase()
                                            .indexOf(title.toLowerCase());
                                        const endIndex =
                                            startIndex + title.length;
                                        return (
                                            <li
                                                key={data.id}
                                                className={
                                                    i === searchIndex
                                                        ? 'selected'
                                                        : ''
                                                }
                                            >
                                                <a
                                                    href={
                                                        data.HMPG_ADDR as string
                                                    }
                                                    target="blank"
                                                    id="searchA"
                                                    title={data.TITLE as string}
                                                >
                                                    {startIndex > -1 &&
                                                    endIndex > -1 ? (
                                                        <>
                                                            {recommendationText.slice(
                                                                0,
                                                                startIndex,
                                                            )}
                                                            <strong className="recommendStrong">
                                                                {recommendationText.slice(
                                                                    startIndex,
                                                                    endIndex,
                                                                )}
                                                            </strong>
                                                            {recommendationText.slice(
                                                                endIndex,
                                                            )}
                                                        </>
                                                    ) : null}
                                                </a>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <li>{debounced}</li>
                                )}
                            </ul>
                        ) : null}
                    </div>
                    <button
                        onClick={() => {
                            setButtonClicked(true);
                            setTitle('');
                            get();
                        }}
                    >
                        검색
                    </button>

                    {/* <p>{title}</p> */}
                </header>
                {/* <main className="cultureContainer">
                    {buttonClicked &&
                        eventData &&
                        eventData.map((data) => {
                            return (
                                <div key={data.id} className="cultureBox">
                                    <a
                                        className="hiddenBoxLink"
                                        href={data.HMPG_ADDR as string}
                                        target="blank"
                                    >
                                        <h2>{data.TITLE}</h2>
                                        <img
                                            src={data.MAIN_IMG as string}
                                            alt=""
                                        />
                                        <p>{data.DATE}</p>
                                        <p>{data.GUNAME}</p>
                                        <p>{data.IS_FREE}</p>
                                        <p>{data.PLACE}</p>
                                        <p>{data.CODENAME}</p>
                                    </a>
                                </div>
                            );
                        })}
                </main> */}
                <main className="cultureContainer">
                    {buttonClicked && eventDataReco[searchIndex] ? (
                        <div className="cultureBox2">
                            <a
                                className="hiddenBoxLink"
                                href={
                                    eventDataReco[searchIndex]
                                        ?.HMPG_ADDR as string
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <h2>{eventDataReco[searchIndex]?.TITLE}</h2>
                                <img
                                    src={
                                        eventDataReco[searchIndex]
                                            ?.MAIN_IMG as string
                                    }
                                    alt=""
                                />
                                <p>{eventDataReco[searchIndex]?.DATE}</p>
                                <p>{eventDataReco[searchIndex]?.GUNAME}</p>
                                <p>{eventDataReco[searchIndex]?.IS_FREE}</p>
                                <p>{eventDataReco[searchIndex]?.PLACE}</p>
                                <p>{eventDataReco[searchIndex]?.CODENAME}</p>
                            </a>
                        </div>
                    ) : (
                        buttonClicked &&
                        eventData &&
                        eventData.map((data) => {
                            return (
                                <div key={data.id} className="cultureBox">
                                    <a
                                        className="hiddenBoxLink"
                                        href={data.HMPG_ADDR as string}
                                        target="blank"
                                    >
                                        <h2>{data.TITLE}</h2>
                                        <img
                                            src={data.MAIN_IMG as string}
                                            alt=""
                                        />
                                        <p>{data.DATE}</p>
                                        <p>{data.GUNAME}</p>
                                        <p>{data.IS_FREE}</p>
                                        <p>{data.PLACE}</p>
                                        <p>{data.CODENAME}</p>
                                    </a>
                                </div>
                            );
                        })
                    )}
                </main>
            </div>
        </>
    );
}
