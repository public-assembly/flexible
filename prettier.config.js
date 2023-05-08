/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf',
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
  pluginSearchDirs: false,
}
