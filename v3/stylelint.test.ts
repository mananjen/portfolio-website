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
