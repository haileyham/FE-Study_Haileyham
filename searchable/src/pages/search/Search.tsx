import React, { useEffect, useState } from 'react';
import config from '../../api/config.json';

// XML 파싱한 것 json으로 변환해서 사용하기
export default function Searching() {
    const [eventData, setEventData] = useState<any>(null);
    const get = async (): Promise<void> => {
        try {
            // const apiKey = process.env.REACT_APP_API_KEY;
            // console.log(apiKey);
            const apiKey2 = config.api_key;
            const response = await fetch(
                `http://openapi.seoul.go.kr:8088/${apiKey2}/xml/culturalEventInfo/1/5/`,
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
                    CODENAME: rowElement.querySelector('CODENAME')?.textContent,
                    GUNAME: rowElement.querySelector('GUNAME')?.textContent,
                    TITLE: rowElement.querySelector('TITLE')?.textContent,
                    DATE: rowElement.querySelector('DATE')?.textContent,
                    PLACE: rowElement.querySelector('PLACE')?.textContent,
                    ORG_NAME: rowElement.querySelector('ORG_NAME')?.textContent,
                    USE_TRGT: rowElement.querySelector('USE_TRGT')?.textContent,
                    USE_FEE: rowElement.querySelector('USE_FEE')?.textContent,
                    PLAYER: rowElement.querySelector('PLAYER')?.textContent,
                    PROGRAM: rowElement.querySelector('PROGRAM')?.textContent,
                    ETC_DESC: rowElement.querySelector('ETC_DESC')?.textContent,
                    ORG_LINK: rowElement.querySelector('ORG_LINK')?.textContent,
                    MAIN_IMG: rowElement.querySelector('MAIN_IMG')?.textContent,
                    RGSTDATE: rowElement.querySelector('RGSTDATE')?.textContent,
                    TICKET: rowElement.querySelector('TICKET')?.textContent,
                    STRTDATE: rowElement.querySelector('STRTDATE')?.textContent,
                    END_DATE: rowElement.querySelector('END_DATE')?.textContent,
                    THEMECODE:
                        rowElement.querySelector('THEMECODE')?.textContent,
                    LOT: rowElement.querySelector('LOT')?.textContent,
                    LAT: rowElement.querySelector('LAT')?.textContent,
                    IS_FREE: rowElement.querySelector('IS_FREE')?.textContent,
                    HMPG_ADDR:
                        rowElement.querySelector('HMPG_ADDR')?.textContent,
                };

                culturalEvents.push(culturalEvent);
            });

            const jsonData = JSON.stringify(culturalEvents, null, 2);
            console.log(jsonData);

            setEventData(jsonData);
            // console.log(eventData[0]);
        } catch (error) {
            console.log('에러발생:', error);
        }
    };

    useEffect(() => {
        get();
    }, []);

    return (
        <>
            <h1>찾아보자!</h1>
            <input type="text" />
            <button>검색</button>
            {eventData && <p>{eventData[0].TITLE}</p>}
        </>
    );
}
