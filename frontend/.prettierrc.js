/** @type {import('prettier').Config} */
module.exports = {
  // Core formatting
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  
  // Line formatting
  printWidth: 100,
  endOfLine: 'lf',
  
  // Bracket formatting
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  
  // Language-specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always',
      },
    },
    {
      files: '*.{yml,yaml}',
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],
  
  // Plugin configurations
  plugins: ['prettier-plugin-tailwindcss'],
  
  // Tailwind CSS class sorting
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'cn', 'cva'],
}
