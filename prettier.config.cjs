/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
