import siteConfig from "@generated/docusaurus.config";
import type * as PrismNamespace from "prismjs";
import type { Optional } from "utility-types";

export default function prismIncludeLanguages(PrismObject: typeof PrismNamespace): void {
  const {
    themeConfig: { prism },
  } = siteConfig;
  const { additionalLanguages } = prism as { additionalLanguages: string[] };

  globalThis.Prism = PrismObject;
  additionalLanguages.forEach((lang) => {
    require(`prismjs/components/prism-${lang}`);
  });
  require("./prism-logs");

  delete (globalThis as Optional<typeof globalThis, "Prism">).Prism;
}
