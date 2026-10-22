import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['**/dist', '**/coverage', '**/node_modules', 'server/prisma/migrations'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },
  {
    files: ['client/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // shadcn primitives and providers intentionally co-export variants/hooks with components.
    files: [
      'client/src/components/ui/**',
      'client/src/providers/**',
      'client/src/**/*Provider.tsx',
    ],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    files: ['server/**/*.ts', '*.js'],
    languageOptions: { globals: globals.node },
  },
  prettier,
);
