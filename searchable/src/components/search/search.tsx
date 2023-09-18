import React, { useEffect, useState } from 'react';
import config from '../../api/config.json';

export default function Search(): JSX.Element {
    const [info, setInfo] = useState<any>(null);

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
            let data = parser.parseFromString(xmlText, 'text/xml');
            console.log(data);
            // const title = data.querySelector('TITLE');
            // console.log(title);
            setInfo(data);
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
            {info && <p>{info.querySelector('TITLE').textContent}</p>}
        </>
    );
}
