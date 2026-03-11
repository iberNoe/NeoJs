/**
 * NeoJS Compiler — Public API
 */

import { parse } from './parser.js';
import { transform } from './transform.js';
import { generate } from './codegen.js';

/**
 * Compile a template string into a render function.
 * @param {string} template 
 * @returns {Function}
 */
export function compile(template) {
    const ast = parse(template);
    const transformedAst = transform(ast);
    const code = generate(transformedAst);

    // We return a function that takes 'h' and 'state' (or context) as arguments
    // In a real system, 'state' would be the component instance.
    // Using new Function() to turn the string into executable code.
    return new Function('h', 'state', `with(state) { ${code} }`);
}
