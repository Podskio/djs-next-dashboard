/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: false,
  semi: false,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [require("prettier-plugin-tailwindcss")],
};
