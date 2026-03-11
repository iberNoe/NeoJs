/**
 * NeoJS — Compiler: Codegen
 * 
 * Generates an executable JavaScript render function string from the AST.
 */

export function generate(ast) {
    const code = `return ${generateNode(ast[0])}`;
    return code;
}

function generateNode(node) {
    if (!node) return 'null';

    switch (node.type) {
        case 'ELEMENT':
            const props = JSON.stringify(node.props || {});
            const children = `[${node.children.map(generateNode).join(',')}]`;
            return `h('${node.tag}', ${props}, ${children})`;

        case 'TEXT':
            return `h(null, null, '${node.content.replace(/'/g, "\\'")}')`;

        case 'INTERPOLATION':
            // Map {{count}} to count.value (assuming state is available in scope)
            return `h(null, null, String(${node.content}))`;

        default:
            return 'null';
    }
}
