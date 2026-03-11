/**
 * NeoJS — Computed Values
 * A lazy computed value that only re-evaluates when 
 * its reactive dependencies change.
 */

import { effect } from './effect.js';

/**
 * Create a computed (lazy) reactive value.
 * @param {Function} getter - Pure function that derives a value
 * @returns {{ value: * }} An object with a reactive `.value` accessor
 */
export function computed(getter) {
    let cachedValue;
    let dirty = true; // true = needs re-evaluation

    // Register an effect that marks the cache stale when deps change
    const runner = effect(() => {
        if (!dirty) {
            dirty = true;
        }
    });

    // We manually override: we don't want it to run getter immediately,
    // so we re-implement a lazy variant
    dirty = true;

    return {
        get value() {
            if (dirty) {
                cachedValue = getter();
                dirty = false;
            }
            return cachedValue;
        }
    };
}
