import {_createId, type Handler} from "./handler";

export function enableSequences(h: Handler): () => any {
    let sequenceIndex = 0;
    const eventListener = function(event: KeyboardEvent) {
        const keyCode = event.code;
        console.log(keyCode);
        if (keyCode === "Escape") {
            sequenceIndex = 0;
            return;
        }

        const keyId = _createId(keyCode, sequenceIndex);
        const inKeySet = h.sequenceKeys.has(keyId);
        if (!inKeySet) {
            sequenceIndex = 0;
            return;
        }

        ++sequenceIndex;

        const action = h.sequenceActions.get(keyId);
        if (action === undefined) {
            return;
        }

        action();

        sequenceIndex = 0;
    };
    window.addEventListener("keydown", eventListener);

    return () => {
        window.removeEventListener("keydown", eventListener);
    };
}


export function bindSequence(h: Handler, keyCodes: string[], action: () => any): void {
    if (keyCodes.length <= 0) {
        return;
    }

    let keyId: string;
    for (let i = 0; i < keyCodes.length; ++i) {
        keyId = _createId(keyCodes[i], i);

        h.sequenceKeys.add(keyId);
    }

    h.sequenceActions.set(keyId!, action);
}

export function unbindSequence(h: Handler, keyCodes: string[]): void {
    let keyId: string;
    for (let i = 0; i < keyCodes.length; ++i) {
        keyId = _createId(keyCodes[i], i);

        h.sequenceKeys.delete(keyId);
    }

    h.sequenceActions.delete(keyId!);
}
