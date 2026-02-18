/*
    A defined scope for handling bindings
 */
import {type _Combination, enableCombinations} from "./combination";
import {enableSequences} from "./sequence";

export interface Handler {
    combinations: Map<string, _Combination>;

    sequenceKeys: Set<string>;
    sequenceActions: Map<string, () => any>;

    disableSequences: () => any;
    disableCombinations: () => any;
}

export function createHandler(): Handler {
    const h: Handler = Object.create(null);

    h.combinations = new Map();

    h.sequenceKeys = new Set();
    h.sequenceActions = new Map();

    return h;
}

export function enable(h: Handler): void {
    h.disableSequences = enableSequences(h);
    h.disableCombinations = enableCombinations(h);
}

export function disable(h: Handler): void {
    h.disableCombinations?.();
    h.disableSequences?.();
}

export function _createId(keyCode: string, index: number): string {
    return `i${index}k${keyCode}`;
}
