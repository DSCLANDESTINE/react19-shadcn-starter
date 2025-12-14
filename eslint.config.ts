import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // -------------------------
      // 🚫 Commit-blocking rules
      // -------------------------
      "no-console": "error",
      "no-debugger": "error",
      eqeqeq: "error",
      curly: "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-multi-spaces": "error",

      // -------------------------
      // ⚠️ Allowed (warnings only)
      // -------------------------
      "no-trailing-spaces": "warn",
      "no-unused-vars": "off", // handled by TS rule

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",

      // -------------------------
      // ✅ Enforced TS / React rules
      // -------------------------
      "@typescript-eslint/consistent-type-imports": "error",
      "react/self-closing-comp": "error",
      "react/jsx-boolean-value": ["error", "never"],

      // -------------------------
      // React fixes
      // -------------------------
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
]);
