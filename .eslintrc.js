module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
    },
    plugins: ['prettier', '@typescript-eslint'],
    rules: {
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'no-console': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'consistent-return': 'off',
        'no-param-reassign': 0,
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.json'],
            },
        },
    },
};
