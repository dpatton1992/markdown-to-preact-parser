# markdown-to-preact

Convert markdown to Preact components.

## Installation

```bash
npm install markdown-to-preact
```

## Usage

### `markdownToPreact`

Convert markdown content to an array of Preact components.

```typescript
import { markdownToPreact } from 'markdown-to-preact';

const markdownContent = '# Hello, world!';
const components = markdownToPreact(markdownContent);

// Use `components` with Preact render function or other rendering methods.
```

#### Options

- `allowDangerousHtml`: (Optional) Allow dangerous HTML in the markdown. Default is `false`.

### `parseToPreact`

Convert a DOM node to a Preact component.

```typescript
import { parseToPreact } from 'markdown-to-preact';

const node = document.createElement('div');
const component = parseToPreact(node);

// Use `component` with Preact render function or other rendering methods.
```

## Examples

### Convert Markdown to Preact

```typescript
import { markdownToPreact } from 'markdown-to-preact';

const markdownContent = '# Hello, world!';
const components = markdownToPreact(markdownContent);

// Use `components` with Preact render function or other rendering methods.
```

### Convert DOM Node to Preact

```typescript
import { parseToPreact } from 'markdown-to-preact';

const node = document.createElement('div');
const component = parseToPreact(node);

// Use `component` with Preact render function or other rendering methods.
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
