// Components take type and colour from foundation tokens; only the foundation defines raw values.
const tokenOrInherit = ["/^var\\(--[\\w-]+\\)$/", "inherit"]

export default {
  ignoreFiles: ["src/foundation/**"],
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
  },
}
