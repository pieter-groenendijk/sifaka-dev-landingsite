/*
    A defined scope for handling bindings
 */
interface Handler {
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

        const key = createKey(keyCode, sequenceIndex)
        const inKeySet = h.keys.has(key);
        if (!inKeySet) {
            sequenceIndex = 0;
            return;
        }

        ++sequenceIndex;

        console.log("in key set");

        const action = h.actions.get(key)
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

export function bindSequence(h: Handler, keyCodes: string[], action: () => any): void {
    if (keyCodes.length <= 0) {
        return;
    }

    let key: string;
    for (let i = 0; i < keyCodes.length; ++i) {
        key = createKey(keyCodes[i], i);

        h.keys.add(key);
    }

    h.actions.set(key!, action);
}

export function unbindSequence(h: Handler, keyCodes: string[]): void {
    h.actions.delete(keyCodes.join());
}

function createKey(keyCode: string, index: number): string {
    return `i${index}k${keyCode}`;
}
