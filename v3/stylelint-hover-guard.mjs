// Hover is a mouse-first effect (ADR 0003): it must sit inside both `(width >= 64rem)` and `(hover: hover)`,
// so touch-first widths never get it and large touch screens never keep a stuck hover state.
import stylelint from "stylelint"

const ruleName = "portfolio/hover-mouse-first"
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: selector => `Put "${selector}" inside @media (width >= 64rem) and (hover: hover)`,
})

const hoverQuery = /\(\s*hover\s*:\s*hover\s*\)/i
const mouseFirstWidth = /\(\s*width\s*>=\s*64rem\s*\)/i

function mouseFirstOnly(node) {
  let hover = false
  let width = false
  for (let parent = node.parent; parent; parent = parent.parent) {
    if (parent.type !== "atrule" || parent.name.toLowerCase() !== "media") continue
    // A negated query (`not …`) inverts what it contains, so it never counts as mouse-first.
    if (/\bnot\b/i.test(parent.params)) return false
    hover ||= hoverQuery.test(parent.params)
    width ||= mouseFirstWidth.test(parent.params)
  }
  return hover && width
}

const rule = enabled => (root, result) => {
  if (!enabled) return
  root.walkRules(node => {
    if (node.selector.includes(":hover") && !mouseFirstOnly(node)) {
      stylelint.utils.report({ ruleName, result, node, message: messages.rejected(node.selector) })
    }
  })
}
rule.ruleName = ruleName
rule.messages = messages

export default stylelint.createPlugin(ruleName, rule)
