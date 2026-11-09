module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': 'off',
    'linebreak-style': ['error', 'unix'],
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], // Regra adicionada!
  },
};
