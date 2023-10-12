export default function throttle(throttleTime: number) {
    let timer: NodeJS.Timer | null = null;

    const throttleFunc = (callback: () => void) => {
        if (!timer) {
            timer = setTimeout(() => {
                callback(); // 실제 기능을 실행
                timer = null;
            }, throttleTime);
        }
    };

    return throttleFunc;
}
