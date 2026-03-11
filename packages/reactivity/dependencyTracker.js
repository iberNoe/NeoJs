/**
 * NeoJS — Dependency Tracker
 * Maps reactive objects/keys to their subscriber effect functions.
 * Supports the classic track/trigger pattern (similar to Vue 3 internals).
 */

// The effect currently being executed (used for auto-tracking)
let activeEffect = null;

// WeakMap<target, Map<key, Set<effect>>>
const targetMap = new WeakMap();

/**
 * Set the currently active effect (called by effect.js before running fn).
 * @param {Function|null} effect
 */
export function setActiveEffect(effect) {
    activeEffect = effect;
}

/**
 * Track a dependency: record that `activeEffect` depends on target[key].
 * @param {Object} target - The reactive object
 * @param {string} key    - The property being read
 */
export function track(target, key) {
    if (!activeEffect) return;

    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }

    let dep = depsMap.get(key);
    if (!dep) {
        dep = new Set();
        depsMap.set(key, dep);
    }

    dep.add(activeEffect);
}

/**
 * Trigger all effects that depend on target[key].
 * @param {Object} target - The reactive object
 * @param {string} key    - The property that changed
 */
export function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;

    const dep = depsMap.get(key);
    if (!dep) return;

    // Run each subscriber effect
    dep.forEach(effect => {
        if (effect.options && effect.options.scheduler) {
            effect.options.scheduler(effect);
        } else {
            effect();
        }
    });
}
