/**
 * NeoJS — Virtual Node (vnode)
 * 
 * Defines the structure of a virtual node, which is a plain JavaScript object
 * that describes a DOM element.
 */

export const VNodeTypes = {
    ELEMENT: 'ELEMENT',
    TEXT: 'TEXT',
    COMPONENT: 'COMPONENT'
};

/**
 * Create a virtual node (VNode).
 * @param {string|Object} type - Tag name (string) or Component definition (Object).
 * @param {Object|null} props - Attributes, events, and props.
 * @param {Array|string|null} children - Child vnodes or text content.
 * @returns {Object} A VNode object.
 */
export function h(type, props = {}, children = null) {
    let vnodeType;

    if (typeof type === 'string') {
        vnodeType = VNodeTypes.ELEMENT;
    } else if (typeof type === 'object' && type !== null) {
        vnodeType = VNodeTypes.COMPONENT;
    } else {
        vnodeType = VNodeTypes.TEXT;
    }

    // Normalize children
    const normalizedChildren = Array.isArray(children)
        ? children.map(child => typeof child === 'string' ? createTextVNode(child) : child)
        : children !== null
            ? [typeof children === 'string' ? createTextVNode(children) : children]
            : [];

    return {
        type,
        vnodeType,
        props,
        children: normalizedChildren,
        el: null, // Pointer to real DOM element
        key: props ? props.key : null
    };
}

/**
 * Helper to create a text vnode.
 * @param {string} text 
 * @returns {Object} A VNode representing text content.
 */
export function createTextVNode(text) {
    return {
        type: null,
        vnodeType: VNodeTypes.TEXT,
        props: null,
        children: String(text),
        el: null
    };
}
