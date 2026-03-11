/**
 * NeoJS — Runtime: Component
 * 
 * Orchestrates the creation of a component instance, wiring up
 * reactivity, templates (compilation), and the VDOM renderer.
 */

import { reactive, effect } from '../reactivity/index.js';
import { compile } from '../compiler/index.js';
import { h, diff, patch, mount } from '../renderer/index.js';
import { queueJob } from '../core/index.js';
import { normalizeProps } from './props.js';

/**
 * Create a living component instance.
 * @param {Object} def - Component definition ({ data, props, template, methods })
 * @param {Object} rawProps - Initial props passed to the component
 * @returns {Object} Component instance
 */
export function createComponentInstance(def, rawProps = {}) {
    const instance = {
        def,
        props: normalizeProps(rawProps, def.props),
        state: reactive(def.data ? def.data() : {}),
        render: null,
        subTree: null,
        isMounted: false,
        mounted: [],
        updated: [],
        unmounted: []
    };

    // Compile template if provided
    if (def.template && !def.render) {
        instance.render = compile(def.template);
    } else {
        instance.render = def.render;
    }

    // Define update function (the "core loop" of a component)
    const update = () => {
        if (!instance.isMounted) {
            // 1. Initial Render
            const subTree = instance.subTree = instance.render(h, instance.state);
            instance.isMounted = true;
            return subTree;
        } else {
            // 2. Diff & Patch
            const nextSubTree = instance.render(h, instance.state);
            const patches = diff(instance.subTree, nextSubTree);
            patch(instance.subTree.el, patches);
            instance.subTree = nextSubTree;

            // Call updated hooks
            instance.updated.forEach(hook => hook());
        }
    };

    // Setup reactive effect for the update
    // We use the scheduler (queueJob) to batch updates
    const componentEffect = effect(() => {
        queueJob(update);
    });

    instance.update = update;
    instance.stop = componentEffect.stop;

    return instance;
}
