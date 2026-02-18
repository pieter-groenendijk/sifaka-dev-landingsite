import type {Handler} from "./handler";

export interface _Combination {
    activeAmount: number,
    amount: number,
    action: () => any,
}

export function enableCombinations(h: Handler): () => any {
    const activeKeys: string[] = [];
    const keyDownListener = function(event: KeyboardEvent) {
        const keyCode = event.code;
        if (activeKeys.includes(keyCode)) {
            return;
        }
        activeKeys.push(keyCode); // TODO: Optimize as swapback array, to prevent O(n) dynamic resizing.

        const action = h.combinations.get(keysToId(activeKeys)); // TODO: Handle multiple duplicate bindings?
        if (action === undefined) {
            return;
        }

        action();
    }
    window.addEventListener("keydown", keyDownListener);

    const keyUpListener = (event: KeyboardEvent) => {
        const keyCode = event.code;
        const index = activeKeys.indexOf(keyCode);
        activeKeys.splice(index);

        console.log(event.code);
    }
    window.addEventListener("keyup", keyUpListener);


    return () => {
        window.removeEventListener("keydown", keyDownListener);
        window.removeEventListener("keyup", keyUpListener);
    }
}

export function bindCombination(h: Handler, keyCodes: string[], action: () => any): void {
    h.combinations.set(keysToId(keyCodes), action);
}

export function unbindCombination(h: Handler, keyCodes: string[]): void {
    h.combinations.delete(keysToId(keyCodes));
}

function keysToId(keyCodes: string[]): string {
    return keyCodes.sort().join();
}