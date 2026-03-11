/**
 * NeoJS — Lifecycle hooks
 * 
 * Simple lifecycle hook system that allows components to register logic
 * to be executed at key points in their existence.
 */

// We'll use a global variable to track the current component instance
// being initialized/mounted to associate hooks with it.
let currentInstance = null;

export function setCurrentInstance(instance) {
    currentInstance = instance;
}

export function getCurrentInstance() {
    return currentInstance;
}

/**
 * Register a function to be called after the component is mounted.
 * @param {Function} hook 
 */
export function onMounted(hook) {
    if (currentInstance) {
        currentInstance.mounted.push(hook);
    } else {
        console.warn('onMounted() must be called inside a component setup or initialization phase.');
    }
}

/**
 * Register a function to be called after the component is updated.
 * @param {Function} hook 
 */
export function onUpdated(hook) {
    if (currentInstance) {
        currentInstance.updated.push(hook);
    } else {
        console.warn('onUpdated() must be called inside a component setup or initialization phase.');
    }
}

/**
 * Register a function to be called before the component is destroyed.
 * @param {Function} hook 
 */
export function onUnmounted(hook) {
    if (currentInstance) {
        currentInstance.unmounted.push(hook);
    } else {
        console.warn('onUnmounted() must be called inside a component setup or initialization phase.');
    }
}
