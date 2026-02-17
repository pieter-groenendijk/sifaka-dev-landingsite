import {_createId, type Handler} from "./handler";

export function bindSequence(h: Handler, keyCodes: string[], action: () => any): void {
    if (keyCodes.length <= 0) {
        return;
    }

    let keyId: string;
    for (let i = 0; i < keyCodes.length; ++i) {
        keyId = _createId(keyCodes[i], i);

        h.keys.add(keyId);
    }

    h.actions.set(keyId!, action);
}

export function unbindSequence(h: Handler, keyCodes: string[]): void {
    let keyId: string;
    for (let i = 0; i < keyCodes.length; ++i) {
        keyId = _createId(keyCodes[i], i);

        h.keys.delete(keyId);
    }

    h.actions.delete(keyId!);
}
