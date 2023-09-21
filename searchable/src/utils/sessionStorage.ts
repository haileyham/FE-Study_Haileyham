export function setSessionData<T>(key: string, value: T) {
    const jsonData = JSON.stringify(value);
    sessionStorage.setItem(key, jsonData);
}

interface CulturalEvent {
    [key: string]: string | null | undefined;
}

export function getSessionData<T>(key: string): CulturalEvent[] | null {
    const jsonData = sessionStorage.getItem(key);
    if (jsonData) {
        return JSON.parse(jsonData);
    }
    return null;
    // return jsonData ? JSON.parse(jsonData) : null;
}

export function clearSessionData(key: string) {
    sessionStorage.removeItem(key);
}

setSessionData('key', 'hello');
clearSessionData('key');
clearSessionData('쀼');
