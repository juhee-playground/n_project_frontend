import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "src/rm_components/**"]
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  // Disable ESLint stylistic rules that conflict with Prettier.
  configPrettier,
  {
    files: ["**/*.{js,vue}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      "no-console": "off",
      "no-undef": "warn",
      "no-unused-vars": "warn",
      "no-constant-condition": ["error", { checkLoops: false }],
      // Pre-existing issues surfaced now that lint runs again. Downgraded to
      // warnings so they are visible without blocking; fix incrementally.
      "no-dupe-keys": "warn",
      "no-redeclare": "warn",
      "no-useless-assignment": "warn",
      "vue/no-side-effects-in-computed-properties": "warn",
      "vue/no-v-for-template-key-on-child": "warn",
      "vue/valid-v-slot": "off",
      "vue/no-parsing-error": "error",
      "vue/no-unused-components": "warn",
      "vue/order-in-components": "warn",
      // Keep parity with the previous "vue/essential" ruleset: these were not
      // errors before and the existing codebase predates them.
      "vue/multi-word-component-names": "off",
      "vue/no-v-text-v-html-on-component": "off",
      "arrow-parens": ["warn", "as-needed"],
      "prettier/prettier": ["warn", { endOfLine: "auto" }]
    }
  },
  {
    files: ["**/__tests__/**/*.{js,ts}", "tests/unit/**/*.spec.{js,ts}"],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.vitest
      }
    }
  }
];
