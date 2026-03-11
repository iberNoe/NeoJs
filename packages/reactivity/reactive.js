/**
 * NeoJS — Reactive Object
 * Wraps a plain object in a Proxy that tracks property reads
 * and triggers effects on property writes.
 */

import { track, trigger } from './dependencyTracker.js';

/**
 * Make an object deeply reactive.
 * @param {Object} obj - The plain object to make reactive
 * @returns {Proxy} A reactive proxy wrapping obj
 */
export function reactive(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            const value = Reflect.get(target, key, receiver);
            // Track this property read as a dependency
            track(target, key);
            // Recursively make nested objects reactive
            if (value !== null && typeof value === 'object') {
                return reactive(value);
            }
            return value;
        },

        set(target, key, value, receiver) {
            const oldValue = target[key];
            const result = Reflect.set(target, key, value, receiver);
            // Only trigger if value actually changed
            if (oldValue !== value) {
                trigger(target, key);
            }
            return result;
        },

        deleteProperty(target, key) {
            const hadKey = Object.prototype.hasOwnProperty.call(target, key);
            const result = Reflect.deleteProperty(target, key);
            if (hadKey) {
                trigger(target, key);
            }
            return result;
        }
    });
}

/**
 * Check if a value is a reactive proxy.
 * @param {*} value
 * @returns {boolean}
 */
export function isReactive(value) {
    return value instanceof Object && value.__isReactive === true;
}
