import { describe, it, expect } from "vitest";
import dedent from "dedent";
import { process } from "./util/index";

describe(`within a markdown content`, () => {
  // ******************************************
  it(`works in different markdown elements`, async () => {
    const input = dedent`
      # heading with --deleted--

      + --deleted-- in a list item
      + list item with --deleted--

      |Abc|Xyz|
      |---|---|
      |normal|--deleted--|

      Here are *--italic deleted--* and **--bold deleted--**

      > Here is --deleted-- in blockquote
    `;

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <h1>heading with <del class="remark-del">deleted</del></h1>
      <ul>
        <li><del class="remark-del">deleted</del> in a list item</li>
        <li>list item with <del class="remark-del">deleted</del></li>
      </ul>
      <table>
        <thead>
          <tr>
            <th>Abc</th>
            <th>Xyz</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>normal</td>
            <td><del class="remark-del">deleted</del></td>
          </tr>
        </tbody>
      </table>
      <p>Here are <em><del class="remark-del">italic deleted</del></em> and <strong><del class="remark-del">bold deleted</del></strong></p>
      <blockquote>
        <p>Here is <del class="remark-del">deleted</del> in blockquote</p>
      </blockquote>
      "
    `);
  });

  // ******************************************
  it(`works if it contains other phrasing contents like **strong**`, async () => {
    const input = dedent`
      foo--**a--b**--bar

      foo --**a--b**-- bar

      --foo **a--b** bar--
    `;

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <p>foo<del class="remark-del"><strong>a--b</strong></del>bar</p>
      <p>foo <del class="remark-del"><strong>a--b</strong></del> bar</p>
      <p><del class="remark-del">foo <strong>a--b</strong> bar</del></p>
      "
    `);
  });

  // ******************************************
  it(`works if contains other phrasing contents`, async () => {
    const input = dedent`
      open--**strong --_italik deleted_-- deleted**--close

      --open**strong --_italik deleted_-- deleted**close--
    `;

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <p>open<del class="remark-del"><strong>strong <del class="remark-del"><em>italik deleted</em></del> deleted</strong></del>close</p>
      <p><del class="remark-del">open<strong>strong <del class="remark-del"><em>italik deleted</em></del> deleted</strong>close</del></p>
      "
    `);
  });
});
