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
 * @param {Object} options - Options including scheduler
 * @returns {Object} - The effect runner
 */
export function effect(fn, options = {}) {
    const effectFn = () => {
        if (!effectFn.active) return fn();

        setActiveEffect(effectFn);
        try {
            return fn();
        } finally {
            setActiveEffect(null);
        }
    };

    effectFn.active = true;
    effectFn.options = options;

    // Run immediately to collect dependencies
    effectFn();

    return effectFn;
}
