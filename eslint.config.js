// @ts-check
/**
 * Flat ESLint configuration for the Astro site.
 * Mirrors the prior .eslintrc setup: ESLint + typescript-eslint + astro
 * recommended sets, double quotes, required semicolons.
 */
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["dist/", "public/", ".vscode/", ".astro/", ".claude/", ".github/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: [
        "error",
        "double",
        { allowTemplateLiterals: true, avoidEscape: true },
      ],
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
);
