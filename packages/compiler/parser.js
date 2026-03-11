/**
 * NeoJS — Compiler: Parser
 * 
 * Parses a template string into an Abstract Syntax Tree (AST).
 * For simplicity, we'll implement a basic regex-based parser
 * that handles tags, static text, and {{interpolation}}.
 */

export function parse(template) {
    const ast = [];
    let current = 0;

    while (current < template.length) {
        let char = template[current];

        // Handle Tags
        if (char === '<') {
            let tagMatch = template.slice(current).match(/^<(\w+)([^>]*)>/);
            if (tagMatch) {
                const tagName = tagMatch[1];
                const propsString = tagMatch[2];
                const props = parseProps(propsString);

                current += tagMatch[0].length;

                // Find closing tag to get children (Simplistic approach)
                const closingTag = `</${tagName}>`;
                const closingIndex = template.indexOf(closingTag, current);

                let children = [];
                if (closingIndex !== -1) {
                    const innerTemplate = template.slice(current, closingIndex);
                    children = parse(innerTemplate);
                    current = closingIndex + closingTag.length;
                }

                ast.push({
                    type: 'ELEMENT',
                    tag: tagName,
                    props,
                    children
                });
                continue;
            }
        }

        // Handle Interpolation {{ }}
        if (char === '{' && template[current + 1] === '{') {
            let end = template.indexOf('}}', current);
            if (end !== -1) {
                const expression = template.slice(current + 2, end).trim();
                ast.push({
                    type: 'INTERPOLATION',
                    content: expression
                });
                current = end + 2;
                continue;
            }
        }

        // Handle Static Text
        let nextSpecial = template.slice(current).search(/[<{]/);
        let text;
        if (nextSpecial === -1) {
            text = template.slice(current);
            current = template.length;
        } else {
            text = template.slice(current, current + nextSpecial);
            current += nextSpecial;
        }

        if (text.trim()) {
            ast.push({
                type: 'TEXT',
                content: text
            });
        } else if (text === '') {
            // edge case avoid infinite loop
            current++;
        }
    }

    return ast;
}

function parseProps(propsString) {
    const props = {};
    const propRegex = /(\w+|@\w+|:\w+)=["']([^"']*)["']/g;
    let match;
    while ((match = propRegex.exec(propsString)) !== null) {
        props[match[1]] = match[2];
    }
    return props;
}
