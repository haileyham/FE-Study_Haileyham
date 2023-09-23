import React from 'react';

export default async function api(): Promise<void> {
    const apiKey = process.env.REACT_APP_API_KEY;
    try {
        const response = await fetch(
            `http://openapi.seoul.go.kr:8088/${apiKey}/xml/culturalEventInfo/1/5/`,
        );
        if (!response.ok) {
            throw new Error('오류');
        }
        const xmlText = await response.text();
        const parser = new DOMParser();
        let data = parser.parseFromString(xmlText, 'text/xml');
        console.log(data);
        const title = data.querySelector('TITLE');
        console.log(title);
    } catch (error) {
        console.log('에러발생:', error);
    }
}
