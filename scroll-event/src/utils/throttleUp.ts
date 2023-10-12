export function throttleUp<T extends Function>(
    callback: T,
    throttleTime: number,
): T {
    let timer: NodeJS.Timer | null = null;

    return function (this: any, ...args: any[]) {
        if (!timer) {
            timer = setTimeout(() => {
                callback.apply(this, args); // 실제 기능을 실행
                timer = null;
            }, throttleTime);
        }
    } as unknown as T;
}
