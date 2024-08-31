// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'

// export default tseslint.config({
//     extends: [js.configs.recommended, ...tseslint.configs.recommended],
//     files: ['**/*.{ts,tsx}'],
//     ignores: ['dist'],
//     languageOptions: {
//         ecmaVersion: 2020,
//         globals: globals.browser,
//     },
//     plugins: {
//         'react-hooks': reactHooks,
//         'react-refresh': reactRefresh,
//     },
//     rules: {
//         ...reactHooks.configs.recommended.rules,
//         'react-refresh/only-export-components': [
//             'warn',
//             { allowConstantExport: true },
//         ],
//     },
// })

// .eslintrc.js
import { ESLint } from "eslint";
import eslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintParser from "@typescript-eslint/parser";

// Define configuration
const eslintConfig = {
  parser: eslintParser,
  plugins: ["@typescript-eslint", "react-hooks", "react-refresh"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  globals: {
    browser: "readonly",
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
  ],
  ignorePatterns: ["dist", "build/", "node_modules/"],
};

// Export configuration
export default eslintConfig;
