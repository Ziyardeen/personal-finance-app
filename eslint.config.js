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

import { ESLint } from "eslint";
import eslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintParser from "@typescript-eslint/parser";

export default new ESLint({
  baseConfig: {
    parser: eslintParser,
    plugins: [eslintPlugin],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    rules: {
      ...eslintPlugin.configs.recommended.rules,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
      },
    },
  ],
});
