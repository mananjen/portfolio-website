// Components take type and colour from foundation tokens; only the foundation defines raw values.
const tokenOrInherit = ["/^var\\(--[\\w-]+\\)$/", "inherit"]

export default {
  plugins: ["./stylelint-hover-guard.mjs"],
  rules: {
    "declaration-property-value-allowed-list": {
      "/^font-(size|family)$/": tokenOrInherit,
      "line-height": tokenOrInherit,
      "letter-spacing": tokenOrInherit,
      font: tokenOrInherit,
    },
    "color-no-hex": true,
    "color-named": "never",
    "function-disallowed-list": ["rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch"],

    // Layout (ADR 0004) and input (ADR 0003): the only page widths are 48rem and 64rem, written as ranges.
    "media-feature-name-value-allowed-list": {
      "/^(min-|max-)?(device-)?width$/": ["48rem", "64rem"],
    },
    "media-feature-range-notation": "context",
    // Components size to their inline space only; `size` containment collapses their height.
    "declaration-property-value-disallowed-list": {
      "container-type": ["/^size$/"],
      container: ["/\\/\\s*size$/"],
    },
    "portfolio/hover-mouse-first": true,
  },
  overrides: [
    {
      files: ["src/foundation/**"],
      rules: {
        "declaration-property-value-allowed-list": null,
        "color-no-hex": null,
        "color-named": null,
        "function-disallowed-list": null,
      },
    },
  ],
}
