import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist", "node_modules"] }, // Added node_modules to ignores

  // Main config
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Added TypeScript support
    languageOptions: {
      ecmaVersion: 2022, // Updated to latest
      globals: {
        ...globals.browser,
        ...globals.node, // Added Node.js globals if needed
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
        jsxPragma: "React", // Explicit React JSX pragma
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Modified rules for better Framer Motion/React support
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_|^motion$", // Allows _prefix and 'motion'
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Additional recommended React rules
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect", // Auto-detects React version
      },
    },
  },

  // Optional: Separate config for test files
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"],
    env: {
      jest: true,
    },
    rules: {
      "no-unused-vars": "off", // Often needed in tests
    },
  },
];
