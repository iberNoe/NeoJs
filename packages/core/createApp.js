/**
 * NeoJS — createApp
 * 
 * Factory function to create a new application instance.
 */

import { setCurrentInstance } from './lifecycle.js';
import { mount } from '../renderer/index.js';

/**
 * Create a NeoJS application.
 * @param {Object} rootComponent - The root component definition.
 * @returns {Object} The application instance.
 */
export function createApp(rootComponent) {
    const app = {
        _component: rootComponent,
        _container: null,
        _instance: null,

        /**
         * Mount the application to a DOM element.
         * @param {string|Element} selectorOrEl - CSS selector or DOM element.
         */
        mount(selectorOrEl) {
            const container = typeof selectorOrEl === 'string'
                ? document.querySelector(selectorOrEl)
                : selectorOrEl;

            if (!container) {
                console.error(`Could not find container: ${selectorOrEl}`);
                return;
            }

            this._container = container;

            // Create a component instance (this will be more complex in Phase 6)
            const instance = {
                def: rootComponent,
                mounted: [],
                updated: [],
                unmounted: [],
                // state, render function, etc will be wired up in runtime
            };
            this._instance = instance;

            // In the simplest case from the user's example:
            // container.innerHTML = rootComponent.render();
            // But we will use our renderer subsequently.

            // Setup phase
            setCurrentInstance(instance);

            // Initial render and mount
            // For now, simpler implementation as Phase 4/6 will expand this
            if (typeof rootComponent.render === 'function') {
                // This is where real Virtual DOM integration happens
                // mount(rootComponent.render(), container);
            } else {
                // Fallback for simple example
                container.innerHTML = rootComponent.template || '';
            }

            // Call mounted hooks
            instance.mounted.forEach(hook => hook());

            setCurrentInstance(null);

            return instance;
        }
    };

    return app;
}
