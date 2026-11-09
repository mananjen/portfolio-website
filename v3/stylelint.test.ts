// @vitest-environment node
import { fileURLToPath } from "node:url"
import stylelint from "stylelint"
import { expect, it } from "vitest"

const cwd = fileURLToPath(new URL(".", import.meta.url))

async function lint(code: string, file = "src/components/Example.module.css") {
  const { results } = await stylelint.lint({ code, codeFilename: file, cwd })
  return results[0].warnings.map(warning => warning.rule)
}

it.each([
  ["font-size: 14px"],
  ["font-size: var(--size-ui, 14px)"],
  ["font-family: Georgia, serif"],
  ["font: 12px/1.5 monospace"],
  ["line-height: 1.4"],
  ["letter-spacing: -0.02em"],
  ["color: #e0ebff"],
  ["background: rgb(220 230 246)"],
  ["border-color: hsl(210 50% 50%)"],
  ["color: white"],
])("rejects a raw `%s` in a component module", async declaration => {
  expect(await lint(`.thing { ${declaration}; }`)).not.toEqual([])
})

it("allows tokens, inherit, keywords, and weight tweaks in a component module", async () => {
  const css = `.thing {
    composes: ui from "../foundation/text.module.css";
    font-size: var(--size-ui);
    font: inherit;
    font: var(--font-shorthand);
    line-height: inherit;
    font-weight: 600;
    color: var(--accent);
    background: transparent;
    border-color: currentColor;
  }`
  expect(await lint(css)).toEqual([])
})

it("leaves the foundation free to define raw values", async () => {
  expect(await lint(".display { font-size: 14px; color: #fff; }", "src/foundation/text.module.css")).toEqual([])
})

it.each([
  ["@media (width < 40rem) { .thing { display: none; } }"],
  ["@media (width >= 768px) { .thing { display: none; } }"],
  ["@media (max-width: 48rem) { .thing { display: none; } }"],
  ["@media (min-width: 600px) { .thing { display: none; } }"],
  [".thing { container-type: size; }"],
  [".thing { container: card / size; }"],
  [".thing:hover { color: var(--accent); }"],
  ["@media (width >= 64rem) { .thing:hover { color: var(--accent); } }"],
  ["@media (hover: hover) { .thing:hover { color: var(--accent); } }"],
  ["@media (width < 64rem) and (hover: hover) { .thing:hover { color: var(--accent); } }"],
  ["@media (width >= 64rem) and (not (hover: hover)) { .thing:hover { color: var(--accent); } }"],
  ["@media not all and (hover: hover) { @media (width >= 64rem) { .thing:hover { color: var(--accent); } } }"],
])("rejects `%s`", async css => {
  expect(await lint(css)).not.toEqual([])
})

it("allows the 48rem and 64rem page widths, inline-size containers, and hover only when mouse-first", async () => {
  const css = `
    .thing { container-type: inline-size; }
    .card { container: card / inline-size; }
    @media (width < 48rem) { .thing { display: none; } }
    @media (width >= 64rem) { .thing { display: none; } }
    @container (width < 40rem) { .thing { display: none; } }
    @media (width >= 64rem) and (hover: hover) { .thing:hover { color: var(--accent); } }
    @media (width >= 64rem) { @media (hover: hover) { .outer { &:hover { color: var(--accent); } } } }`
  expect(await lint(css)).toEqual([])
})

it("guards hover and page widths in the foundation too", async () => {
  expect(await lint("a:hover { color: #fff; }", "src/foundation/index.css")).toEqual(["portfolio/hover-mouse-first"])
  expect(await lint("@media (width < 30rem) { a { color: #fff; } }", "src/foundation/index.css")).not.toEqual([])
})
