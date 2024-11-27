/**
 * @license
 * Copyright 2024 Daymon Littrell-Reyes
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import eslint from "@eslint/js";
import headers from "eslint-plugin-headers";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginRoblox from "eslint-plugin-roblox-ts";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginUnicorn.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    plugins: {
      headers,
    },
    rules: {
      camelcase: "off",
      "no-undef-init": "warn",
      "max-params": "off",
      "headers/header-format": [
        "error",
        {
          source: "file",
          path: "assets/license-header.txt",
          trailingNewlines: 2,
          variables: {
            year: "2024",
            name: "Daymon Littrell-Reyes",
          },
        },
      ],
      "prettier/prettier": [
        "warn",
        {
          semi: true,
          trailingComma: "all",
          singleQuote: false,
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          arrowParens: "always",
          endOfLine: "lf",
          bracketSpacing: true,
          plugins: ["prettier-plugin-organize-imports"],
        },
      ],
      "prefer-const": [
        "warn",
        {
          destructuring: "all",
        },
      ],
      "no-restricted-globals": [
        "error",
        {
          name: "expect",
          message: "Use @rbxts/expect instead.",
        },
      ],
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/adjacent-overload-signatures": "warn",
    },
  },
  {
    rules: {
      "unicorn/consistent-destructuring": "warn",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-empty-file": "warn",
      "unicorn/catch-error-name": [
        "warn",
        {
          name: "e",
        },
      ],
    },
  },
  {
    files: ["src/**/*.ts"],
    extends: [eslintPluginRoblox.configs.recommended as object],
  },
  {
    ignores: ["out", "**/.docusaurus", "example", "**/dist"],
  },
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs", "*.ts"],
          defaultProject: "tsconfig.json",
        },
        ecmaFeatures: { jsx: true },
      },
    },
  },
);
