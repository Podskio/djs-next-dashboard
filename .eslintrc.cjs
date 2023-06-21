/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["prettier", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: true,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
  },
  overrides: [
    {
      files: ["apps/web/**/*.{ts,tsx}"],
      plugins: ["react", "react-hooks"],
      extends: [
        "prettier",
        "next/core-web-vitals",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
      ],
      rules: {
        "react/react-in-jsx-scope": "off",
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
  ],
  settings: {
    next: {
      rootDir: "apps/web",
    },
  },
  ignorePatterns: [
    ".eslintrc.cjs",
    "*.config.cjs",
    "**/dist/**",
    "**/.next/**",
  ],
  root: true,
};
