import { defineConfig } from 'eslint/config'
import stylisticJs from '@stylistic/eslint-plugin-js'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig([{
  extends: compat.extends('eslint:recommended'),

  plugins: {
    '@stylistic/js': stylisticJs,
  },

  languageOptions: {
    globals: {
      ...globals.commonjs,
      ...globals.node,
    },

    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    '@stylistic/js/indent': ['error', 2],
    '@stylistic/js/linebreak-style': ['error', 'windows'],
    '@stylistic/js/quotes': ['error', 'single'],
    '@stylistic/js/semi': ['error', 'never'],
    'eqeqeq': ['error', 'always'],
    'no-console': 'warn',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }]
  },

  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/coverage/**',
    '**/.next/**',
    '**/.turbo/**',
    '**/.vercel/**',
    '**/.eslint.config.mjs/**'
  ],
}, {
  files: ['**/.eslintrc.{js,cjs}'],

  languageOptions: {
    globals: {
      ...globals.node,
    },

    ecmaVersion: 5,
    sourceType: 'commonjs',
  },
}])
