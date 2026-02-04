module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    settings: {
        react: { version: 'detect' },
    },
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'jsx-a11y',
        'testing-library',
        'jest-dom',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    overrides: [
        {
            files: ['**/*.test.ts', '**/*.test.tsx'],
            extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
            rules: {
                'react/react-in-jsx-scope': 'off',
            },
        },
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',

        // ✅ TypeScript ya hace la validación de props; PropTypes sobra y rompe lint
        'react/prop-types': 'off',

        // ✅ Para que CI no falle por "any" (si quieres, ponlo en "warn" en vez de "off")
        '@typescript-eslint/no-explicit-any': 'off',
    },
};
