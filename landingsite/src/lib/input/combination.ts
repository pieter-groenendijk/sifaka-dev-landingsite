import type {Handler} from "./handler";

export interface _Combination {
    activeAmount: number,
    amount: number,
    action: () => any,
}

export function enableCombinations(h: Handler): () => any {
    const activeKeys = new Set();
    const keyDownListener = function(event: KeyboardEvent) {
        const keyCode = event.code;
        if (activeKeys.has(keyCode)) {
            return;
        }
        activeKeys.add(keyCode);

        const combination = h.combinations.get(keyCode);
        if (combination === undefined) {
            return;
        }

        ++combination.activeAmount;

        console.log(combination.activeAmount, combination.amount);

        if (combination.activeAmount !== combination.amount) {
            return;
        }

        combination.action();
    }
    window.addEventListener("keydown", keyDownListener);

    const keyUpListener = (event: KeyboardEvent) => {
        const keyCode = event.code;
        activeKeys.delete(keyCode);

        const combination = h.combinations.get(keyCode);
        if (combination === undefined) {
            return;
        }

        --combination.activeAmount;

        console.log(event.code);
    }
    window.addEventListener("keyup", keyUpListener);


    return () => {
        window.removeEventListener("keydown", keyDownListener);
        window.removeEventListener("keyup", keyUpListener);
    }
}

export function bindCombination(h: Handler, keyCodes: string[], action: () => any): void {
    const length = keyCodes.length;

    const combination: _Combination = {
        activeAmount: 0,
        amount: length,
        action: action,
    }

    for (let i = 0; i < length; ++i) {
        // TODO: Add support with combinations with overlapping keyCodes!
        h.combinations.set(keyCodes[i], combination);
    }
}

export function unbindCombination(h: Handler, keyCodes: string[]): void {
    const length = keyCodes.length;
    for (let i = 0; i < length; ++i) {
        h.combinations.delete(keyCodes[i]);
    }
}