export function setSessionData<T>(key: string, value: T) {
    const jsonData = JSON.stringify(value);
    sessionStorage.setItem(key, jsonData);
}

export function getSessionData<T>(key: string): T | null {
    const jsonData = sessionStorage.getItem(key);
    if (jsonData) {
        return JSON.parse(jsonData);
    }
    return null;
}

setSessionData('key', 'hello');
