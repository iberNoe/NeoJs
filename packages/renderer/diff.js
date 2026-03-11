/**
 * NeoJS — Renderer: diffing
 * 
 * Compares two VNode trees and identifies the minimal set of changes.
 */

export const PatchTypes = {
    TEXT: 'TEXT',
    PROPS: 'PROPS',
    REPLACE: 'REPLACE',
    REORDER: 'REORDER'
};

/**
 * Diff two VNodes.
 * @param {Object} oldVNode 
 * @param {Object} newVNode 
 * @returns {Array} List of patches.
 */
export function diff(oldVNode, newVNode) {
    // 1. If types are different, replace entire node
    if (oldVNode.type !== newVNode.type) {
        return [{ type: PatchTypes.REPLACE, newVNode }];
    }

    const patches = [];

    // 2. Handle Text Nodes
    if (newVNode.type === null) {
        if (oldVNode.children !== newVNode.children) {
            patches.push({ type: PatchTypes.TEXT, text: newVNode.children });
        }
        return patches;
    }

    // 3. Diff Props
    const propsPatches = diffProps(oldVNode.props, newVNode.props);
    if (propsPatches.length > 0) {
        patches.push({ type: PatchTypes.PROPS, props: propsPatches });
    }

    // 4. Diff Children (Simple list diffing)
    const childrenPatches = diffChildren(oldVNode.children, newVNode.children);
    if (childrenPatches.length > 0) {
        patches.push({ type: PatchTypes.REORDER, patches: childrenPatches });
    }

    return patches;
}

function diffProps(oldProps = {}, newProps = {}) {
    const patches = [];

    // Set updated or new props
    for (const key in newProps) {
        if (newProps[key] !== oldProps[key]) {
            patches.push({ key, value: newProps[key] });
        }
    }

    // Remove old props
    for (const key in oldProps) {
        if (!(key in newProps)) {
            patches.push({ key, value: null });
        }
    }

    return patches;
}

function diffChildren(oldChildren, newChildren) {
    const patches = [];
    const max = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < max; i++) {
        const oldChild = oldChildren[i];
        const newChild = newChildren[i];

        if (!oldChild) {
            patches.push({ type: 'ADD', node: newChild });
        } else if (!newChild) {
            patches.push({ type: 'REMOVE', index: i });
        } else {
            const childPatches = diff(oldChild, newChild);
            if (childPatches.length > 0) {
                patches.push({ type: 'UPDATE', index: i, patches: childPatches });
            }
        }
    }

    return patches;
}
