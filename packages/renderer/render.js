/**
 * NeoJS — Renderer: mount
 * 
 * Initial mounting of a VNode tree to the real DOM.
 */

import { VNodeTypes, h } from './vnode.js';

/**
 * Create a real DOM element from a VNode.
 * @param {Object} vnode 
 * @returns {Element|Node}
 */
export function createEl(vnode) {
    const { type, vnodeType, props, children } = vnode;
    let el;

    if (vnodeType === VNodeTypes.TEXT) {
        el = vnode.el = document.createTextNode(children);
    } else if (vnodeType === VNodeTypes.ELEMENT) {
        el = vnode.el = document.createElement(type);

        // Apply props
        if (props) {
            for (const key in props) {
                if (key.startsWith('on')) {
                    const eventName = key.slice(2).toLowerCase();
                    el.addEventListener(eventName, props[key]);
                } else if (key === 'className' || key === 'class') {
                    el.setAttribute('class', props[key]);
                } else {
                    el.setAttribute(key, props[key]);
                }
            }
        }

        // Render children
        children.forEach(child => {
            el.appendChild(createEl(child));
        });
    } else if (vnodeType === VNodeTypes.COMPONENT) {
        if (type.render) {
            // Pass 'h' to the component's render function
            const subVNode = type.render(h, {});
            el = vnode.el = createEl(subVNode);
        } else {
            el = vnode.el = document.createComment('component-placeholder');
        }
    }

    return el;
}

/**
 * Mount a VNode to a container.
 * @param {Object} vnode 
 * @param {Element} container 
 */
export function mount(vnode, container) {
    const el = createEl(vnode);
    container.appendChild(el);
}
