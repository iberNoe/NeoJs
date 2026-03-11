/**
 * NeoJS — Compiler: Transform
 * 
 * Post-processes the AST to prepare it for code generation.
 * Handles optimizations and directive mapping.
 */

export function transform(ast) {
    return ast.map(node => {
        // For now, transform is a pass-through
        // In a real framework, you'd hoist static parts here.
        if (node.children) {
            node.children = transform(node.children);
        }
        return node;
    });
}
