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
        "matchers/promises"
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
