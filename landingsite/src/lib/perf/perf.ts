export function debounce(ms: number, func: () => void): () => void {
    let id: number;
    return function() {
        clearTimeout(id);
        id = setTimeout(func, ms);
    }
}

export function throttle(func: () => void, ms: number): () => void {
    let lastExecutedAt: number = performance.now();
    return function() {
        const nowAt: number = performance.now();
        if (nowAt - lastExecutedAt < ms) {
            return;
        }

        func();
        lastExecutedAt = nowAt;
    }
}