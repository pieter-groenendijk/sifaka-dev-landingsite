/*
    A defined scope for handling bindings
 */
export interface Handler {
    keys: Set<string>;
    actions: Map<string, () => any>;

    clearListeners: (() => any),
}

export function createHandler(): Handler {
    const h: Handler = Object.create(null);

    h.keys = new Set();
    h.actions = new Map();
    h.clearListeners = () => {};

    return h;
}

export function enable(h: Handler): void {
    let sequenceIndex = 0;
    const eventListener = function(event: KeyboardEvent) {
        const keyCode = event.code;
        console.log(keyCode);
        if (keyCode === "Escape") {
            sequenceIndex = 0;
            return;
        }

        const keyId = _createId(keyCode, sequenceIndex);
        const inKeySet = h.keys.has(keyId);
        if (!inKeySet) {
            sequenceIndex = 0;
            return;
        }

        ++sequenceIndex;

        const action = h.actions.get(keyId);
        if (action === undefined) {
            return;
        }

        action();

        sequenceIndex = 0;
    };
    window.addEventListener("keydown", eventListener);


    h.clearListeners = () => {
        window.removeEventListener("keydown", eventListener);
    }
}

export function disable(h: Handler): void {
    h.clearListeners();
}


export function _createId(keyCode: string, index: number): string {
    return `i${index}k${keyCode}`;
}
