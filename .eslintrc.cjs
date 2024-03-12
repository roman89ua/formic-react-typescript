/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "@typescript-eslint/no-misused-promises": [2, {
      "checksVoidReturn": {
        "attributes": false
      }
    }],
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": [
          "block",
          "block-like",
          "cjs-export",
          "class",
          "const",
          "export",
          "import",
          "let",
          "var"
        ]
      },
      {
        "blankLine": "always",
        "prev": [
          "block",
          "block-like",
          "cjs-export",
          "class",
          "const",
          "export",
          "import",
          "let",
          "var"
        ],
        "next": "*"
      },
      {
        "blankLine": "always",
        "prev": ["const", "let", "var"],
        "next": ["const", "let", "var"]
      },
      { "blankLine": "any", "prev": ["export", "import"], "next": ["export", "import"] }
    ]
  },
};

module.exports = config;
