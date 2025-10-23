# ➖ remark-del [![Build Status][ci-badge]][ci] [![npm][npm-badge]][npm]

A [unified][unified] / ([remark][remark]) plugin which adds syntax support for the HTML `<del>` element in markdown.

## 📦 Installation

> [!Note]
>
> This library is distributed only as an ESM module.

```bash
npm install @saeris/remark-del
```

or

```bash
yarn add @saeris/remark-del
```

## 🔧 Usage

Using this library will depend on your particular application or framework. Below is a bare-bones example to test it in Node.

**Node:**

```ts
import remark from "remark";
import remarkParse from "remark-parse";
import remarkDel from "@saeris/remark-del";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const markdown = `--deleted text--`

const result = await remark()
  .use(remarkParse)
  .use(remarkDel)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(markdown);

console.log(result.tostring());
// "<p><del class="remark-del">deleted text</del></p>"
```

> [!CAUTION]
>
> Whitespace and newlines on either side of the wrapped text is not supported!
>
> The following will not work:
>
> ```markdown
> -- unsupported whitespace before--
>
> --unsupported whitespace after --
>
> --
> unsupported newline before--
>
> --unsupported newline after
> --
> ```

## 📣 Acknowledgements

This plugin is based on [remark-ins][remark-ins]

## 🥂 License

Released under the [MIT][license] © [Drake Costa][personal-website]

<!-- Definitions -->

[ci]: https://github.com/Saeris/remark-del/actions/workflows/ci.yml
[ci-badge]: https://github.com/Saeris/remark-del/actions/workflows/ci.yml/badge.svg
[npm]: https://www.npmjs.org/package/@saeris/remark-del
[npm-badge]: https://img.shields.io/npm/v/@saeris/remark-del.svg?style=flat
[unified]: https://github.com/unifiedjs/unified
[remark]: https://github.com/remarkjs/remark
[remark-ins]: https://github.com/ipikuka/remark-ins
[license]: ./LICENSE.md
[personal-website]: https://saeris.gg
