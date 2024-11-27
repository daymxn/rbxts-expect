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

import siteConfig from "@generated/docusaurus.config";
import type * as PrismNamespace from "prismjs";

export default function prismIncludeLanguages(PrismObject: typeof PrismNamespace): void {
  const {
    themeConfig: { prism },
  } = siteConfig;
  const { additionalLanguages } = prism as { additionalLanguages: string[] };

  globalThis.Prism = PrismObject;
  for (const lang of additionalLanguages) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, unicorn/prefer-module
    require(`prismjs/components/prism-${lang}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-require-imports, unicorn/prefer-module
  require("./prism-logs");

  delete (globalThis as { Prism?: unknown }).Prism;
}
