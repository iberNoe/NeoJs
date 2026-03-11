/**
 * NeoJS — Effect System
 * Registers a function as a reactive side-effect. 
 * It runs immediately and re-runs automatically whenever its 
 * reactive dependencies change.
 */

import { setActiveEffect } from './dependencyTracker.js';

/**
 * Register and run a reactive effect.
 * @param {Function} fn - The effect function to track and run
 * @returns {{ stop: Function }} - An object with a stop() method to dispose the effect
 */
export function effect(fn) {
    // Wrap fn so we can set/unset activeEffect around it
    const effectFn = () => {
        setActiveEffect(effectFn);
        try {
            fn();
        } finally {
            setActiveEffect(null);
        }
    };

    // Attach original fn for inspection/debugging
    effectFn.raw = fn;

    // Run immediately to collect dependencies
    effectFn();

    return {
        stop() {
            // Nullify so future triggers won't re-run
            effectFn.raw = null;
        }
    };
}
