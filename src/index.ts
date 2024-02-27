import { h } from 'preact';
import { remark } from 'remark';
import html from 'remark-html';

type OptionsParam = {
    allowDangerousHtml?: boolean;
};

/**
 * Convert markdown to preact components
 * @param markdownContent - The markdown content to convert
 * @param options - Options for the conversion
 * @returns The preact components
 * @example
 * ```tsx
 * import { markdownToPreact } from 'markdown-to-preact';
 * const markdownContent = '# Hello, world!';
 * const components = markdownToPreact(markdownContent);
 * render(components, document.body);
 * ```
 */

export function markdownToPreact(markdownContent: string, options: OptionsParam = { allowDangerousHtml: false }) {
    const { allowDangerousHtml } = options;
    const componentsArr: Array<string | preact.JSX.Element> = [];
    const parser = new DOMParser();
    let result = remark()
        .use(html, { sanitize: allowDangerousHtml })
        .processSync(markdownContent)
        .value as string;

    const parsed = parser.parseFromString(result.replace(/(\r\n|\n|\r)/gm, ''), 'text/html').body
        .childNodes;

    parsed.forEach((node) => {
        componentsArr.push(parseToPreact(node));
    });
    console.log(componentsArr);
    return componentsArr;
}

/**
 * Convert a node to preact components
 * @param node - The node to convert
 * @returns The preact components
 * @example
 * ```tsx
 * import { parseToPreact } from 'markdown-to-preact';
 * const node = document.createElement('div');
 * const components = parseToPreact(node);
 * render(components, document.body);
 * ```
 * @example
 * ```tsx
 * import { parseToPreact } from 'markdown-to-preact';
 * const node = document.createElement('div');
 * const components = parseToPreact(node);
 * render(components, document.body);
 * ```
 */

export function parseToPreact(node: Node): string | preact.JSX.Element {
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || '';
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elementNode = node as Element; // Cast node to Element type
        const tagName = elementNode.nodeName.toLowerCase();
        const props: { [key: string]: any } = {};

        const attributes = Array.from(elementNode.attributes);
        
        attributes.forEach(({ name, value }) => {
            props[name] = value;
        });

        const children = Array.from(elementNode.childNodes).map(parseToPreact);

        return h(tagName, props, children);
    }
    throw new Error('Unknown node type');
}