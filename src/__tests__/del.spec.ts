import { describe, it, expect } from "vitest";
import dedent from "dedent";
import { process } from "./util/index";

describe(`no options - fail`, () => {
  // ******************************************
  it(`bad usage`, async () => {
    const input = dedent`
      --deleted text with bad wrapped-

      -deleted text with bad wrapped--

      - -deleted text with bad wrapped--

      -- deleted text with unwanted space--

      --deleted text with unwanted space --
    `;

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <p>--deleted text with bad wrapped-</p>
      <p>-deleted text with bad wrapped--</p>
      <ul>
        <li>-deleted text with bad wrapped--</li>
      </ul>
      <p>-- deleted text with unwanted space--</p>
      <p>--deleted text with unwanted space --</p>
      "
    `);
  });
});

describe(`no options - success`, () => {
  // ******************************************
  it(`empty deleted texts`, async () => {
    const input = dedent(`
      ----

      --  --

      a-- --a
    `);

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <hr>
      <hr>
      <p>a<del class="remark-del-empty"></del>a</p>
      "
    `);
  });

  // ******************************************
  it(`standart usage`, async () => {
    const input = dedent(`
      --deleted-- --another deleted--
    `);

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <p><del class="remark-del">deleted</del> <del class="remark-del">another deleted</del></p>
      "
    `);
  });

  // ******************************************
  it(`deleted text in a strong`, async () => {
    const input = dedent(`     
      **--bold deleted--**

      here is **--bold deleted--**

      **--bold deleted--** is here

      **strong --bold deleted--**
    `);

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <p><strong><del class="remark-del">bold deleted</del></strong></p>
      <p>here is <strong><del class="remark-del">bold deleted</del></strong></p>
      <p><strong><del class="remark-del">bold deleted</del></strong> is here</p>
      <p><strong>strong <del class="remark-del">bold deleted</del></strong></p>
      "
    `);
  });

  // ******************************************
  it(`standart usage with extra content`, async () => {
    const input = dedent(`     
      --deleted-- with extra content -- could not deleted-- 

      --deleted-- **with extra boldcontent** --another could not deleted -- 
    `);

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <p><del class="remark-del">deleted</del> with extra content -- could not deleted--</p>
      <p><del class="remark-del">deleted</del> <strong>with extra boldcontent</strong> --another could not deleted --</p>
      "
    `);
  });

  // ******************************************
  it(`example in README`, async () => {
    const input = dedent(`     
      Here is ~~deleted content~~ and --deleted content--

      Here is **--bold and deleted content--**
      
      ### Heading with --deleted content--
    `);

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <p>Here is <del>deleted content</del> and <del class="remark-del">deleted content</del></p>
      <p>Here is <strong><del class="remark-del">bold and deleted content</del></strong></p>
      <h3>Heading with <del class="remark-del">deleted content</del></h3>
      "
    `);
  });

  // ******************************************
  it(`nested del don't work, arbitrary deleted texts are considered right`, async () => {
    const input = dedent`
      --outer --inner-- deleted--

      --deleted--inner--deleted--
    `;

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <p><del class="remark-del">outer --inner</del> deleted--</p>
      <p><del class="remark-del">deleted</del>inner<del class="remark-del">deleted</del></p>
      "
    `);
  });

  // ******************************************
  it(`works if contadel other phrasing contents`, async () => {
    const input = dedent`
      --**xxx--_yyy_--zzz**--

      --Google is [--another deleted--](https://www.google.com) in deleted--
    `;

    expect(await process(input)).toMatchInlineSnapshot(`
      "
      <p><del class="remark-del"><strong>xxx<del class="remark-del"><em>yyy</em></del>zzz</strong></del></p>
      <p><del class="remark-del">Google is <a href="https://www.google.com"><del class="remark-del">another deleted</del></a> in deleted</del></p>
      "
    `);
  });
});
