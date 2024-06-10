/**
 * @type {import('prettier').Config}
 */
const config = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  printWidth: 80,
  quoteProps: 'preserve',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  overrides: [{ files: '*.scss', options: { singleQuote: false } }]
};

export default config;
