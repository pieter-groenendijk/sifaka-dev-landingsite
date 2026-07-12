export function debounced<TArgs extends any[]>(ms: number, func: (this: any, ...args: TArgs) => void): () => void {
    let id: number;
    return (...args: TArgs) => {
        clearTimeout(id);
        id = setTimeout(() => {
            func(...args);
        }, ms);
    }
}

export function throttled<TArgs extends any[]>(ms: number, func: (...args: TArgs) => void): () => void {
    let lastExecutedAt: number = performance.now();
    return (...args: TArgs) => {
        const nowAt: number = performance.now();
        if (nowAt - lastExecutedAt < ms) {
            return;
        }

        func(...args);
        lastExecutedAt = nowAt;
    }
}

/*
    Returns a wrapper for given function that when called will only call the given function if enough time has passed.
    A throttled call will trail the interval, and override the arguments of an existing trailing call if set.
 */
export function trailThrottled<TArgs extends any[]>(minTime: number, func: (...args: TArgs) => void): () => void {
    let lastCallAt = performance.now();
    let trailingCallId: number|undefined;
    let trailingCallArgs: TArgs;
    return (...args: TArgs) => {
        const now = performance.now();
        const elapsedTime = now - lastCallAt;
        if (elapsedTime < minTime) {
            trailingCallArgs = args;
            if (trailingCallId !== undefined) {
                return;
            }

            trailingCallId = setTimeout(() => {
                func(...trailingCallArgs);
                trailingCallId = undefined;
            }, minTime - elapsedTime);
        } else {
            func(...args);
            lastCallAt = now;
        }
    }
}

export const queueTask: (func: VoidFunction) => number
    = setTimeout;

export const unqueueTask: (funcId: number) => void
    = clearTimeout;

