/**
 * NeoJS — Runtime: Props
 * 
 * Logic for normalizing and updating component props.
 */

export function normalizeProps(rawProps, schema = {}) {
    const props = {};
    for (const key in rawProps) {
        // In a real framework, we'd validate against schema here
        props[key] = rawProps[key];
    }
    return props;
}

export function updateProps(instance, nextProps) {
    // Simple replacement for now
    instance.props = normalizeProps(nextProps, instance.def.props);
}
