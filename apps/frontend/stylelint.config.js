/** @type {import('stylelint').Config} */
const config = {
  extends: ['../../stylelint.config.js', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] }
    ]
  }
};

export default config;
