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

import { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: ["quick-start", "usage-guide", "using-with-testez", "faq"],
    },
    {
      type: "category",
      label: "Matchers",
      link: {
        type: "generated-index",
        title: "Matchers",
        description: "A compiled list of available matchers.",
        keywords: ["matchers"],
      },
      items: [
        "matchers/basic",
        "matchers/strings",
        "matchers/numbers",
        "matchers/enums",
        "matchers/arrays",
        "matchers/objects",
        "matchers/functions",
        "matchers/promises",
      ],
    },
    {
      type: "category",
      label: "Extension Guides",
      link: {
        type: "generated-index",
        title: "Extension Guides",
        description: "Learn how to extend expect with your own functionality.",
        keywords: ["guides", "extension", "libraries", "custom"],
      },
      items: [
        "extension-guides/introduction",
        "extension-guides/module-augmentation",
        "extension-guides/custom-methods",
        "extension-guides/custom-properties",
        "extension-guides/expect-messages",
        "extension-guides/testing",
        "extension-guides/publishing",
      ],
    },
  ],
};

export default sidebars;
