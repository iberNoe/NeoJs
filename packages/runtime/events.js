/**
 * NeoJS — Runtime: Events
 * 
 * Minimal internal event bus for components to communicate.
 */

export function createEventBus() {
    const listeners = new Map();

    return {
        on(event, callback) {
            if (!listeners.has(event)) {
                listeners.set(event, []);
            }
            listeners.get(event).push(callback);
        },

        off(event, callback) {
            if (!listeners.has(event)) return;
            const queue = listeners.get(event);
            const index = queue.indexOf(callback);
            if (index !== -1) queue.splice(index, 1);
        },

        emit(event, ...args) {
            if (!listeners.has(event)) return;
            listeners.get(event).forEach(cb => cb(...args));
        }
    };
}
