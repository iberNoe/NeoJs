/**
 * NeoJS — createApp
 * 
 * Factory function to create a new application instance.
 */

import { setCurrentInstance } from './lifecycle.js';
import { mount, h } from '../renderer/index.js';
import { createComponentInstance } from '../runtime/index.js';

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

            // 1. Initialize component instance (wires up reactivity, compiler, etc.)
            // The createComponentInstance already calls update() once sync
            const instance = createComponentInstance(rootComponent);
            this._instance = instance;

            // 2. Setup lifecycle tracking
            setCurrentInstance(instance);

            // 3. Mount the initial VNode (stored in instance.subTree)
            mount(instance.subTree, container);

            // 4. Call mounted hooks
            if (instance.mounted) {
                instance.mounted.forEach(hook => hook());
            }

            setCurrentInstance(null);

            return instance;
        }
    };

    return app;
}
