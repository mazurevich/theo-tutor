module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: "module",
  },
  globals: { React: true },
  plugins: ["react", "react-hooks", "prettier", "@typescript-eslint", "import"],
  settings: { react: { version: "18.1.0" } },
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-indent": "off",
    "react/jsx-indent-props": "off",
    "react/forbid-prop-types": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react-hooks/exhaustive-deps": "error",
    "react/no-array-index-key": "off",
    "arrow-parens": "off",
    "space-in-parens": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "computed-property-spacing": ["error", "never"],
    "array-bracket-spacing": ["error", "never"],
    "space-unary-ops": "error",
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-style": ["error", "last"],
    "space-infix-ops": ["error", { int32Hint: false }],
    "keyword-spacing": ["error", { before: true }],
    "prefer-arrow-callback": "error",
    "no-promise-executor-return": "error",
    "no-sequences": "error",
    "quote-props": ["error", "as-needed"],
    "jsx-quotes": ["error", "prefer-double"],
    "no-console": "error",
    "no-multi-spaces": "error",
    "padded-blocks": ["error", "never"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "key-spacing": ["error", { beforeColon: false }],
    "react/display-name": "off",
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "no-await-in-loop": "error",
    "linebreak-style": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "no-duplicate-imports": ["error", { includeExports: true }],
  },
  ignorePatterns: ["node_modules/", "webpack.config.js"],
};
