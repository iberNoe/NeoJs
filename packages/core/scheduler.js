/**
 * NeoJS — Scheduler
 * 
 * Batches multiple updates into a single re-render using microtasks.
 * This prevents unnecessary work if multiple reactive properties are changed in the same tick.
 */

let queue = [];
let pending = false;

/**
 * Queue a job (function) to be run in the next microtask.
 * @param {Function} job - The function to queue.
 */
export function queueJob(job) {
    if (!queue.includes(job)) {
        queue.push(job);
        if (!pending) {
            pending = true;
            // Schedule to run in the next microtask
            Promise.resolve().then(flushQueue);
        }
    }
}

/**
 * Flush the queue and run all jobs.
 */
function flushQueue() {
    try {
        for (let i = 0; i < queue.length; i++) {
            queue[i]();
        }
    } finally {
        pending = false;
        queue = [];
    }
}

/**
 * Wait for the next tick (useful for testing or manual manual waits).
 * @returns {Promise}
 */
export function nextTick() {
    return Promise.resolve();
}
