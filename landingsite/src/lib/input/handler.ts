/*
    A defined scope for handling bindings
 */
interface Handler {
    actions: Map<string, () => any>,

    clearListeners: (() => any),
}

export function createHandler(): Handler {
    const h: Handler = Object.create(null);

    h.actions = new Map();
    h.clearListeners = () => {};

    return h;
}

export function enable(h: Handler): void {
    let currentSequence: string = "";
    const eventListener = function(event: KeyboardEvent) {
        const keyCode = event.code;
        console.log(keyCode);
        if (keyCode === "Unidentified" || keyCode === "") {
            return;
        }
        if (keyCode === "Escape") {
            currentSequence = "";
            return;
        }

        currentSequence = currentSequence + keyCode;
        console.log(currentSequence);

        const action = h.actions.get(currentSequence);
        if (action === undefined) {
            return;
        }

        action();
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
    h.actions.set(keyCodes.join(), action);
}

export function unbindSequence(h: Handler, keyCodes: string[]): void {
    h.actions.delete(keyCodes.join());
}