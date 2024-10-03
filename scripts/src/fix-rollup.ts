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

import { readFile, writeFile } from "fs-extra";
import ts, { SourceFile } from "typescript";
import { transformCombineAugmentations } from "./transformers/combine-agumentation";
import { transformIdentifierNames } from "./transformers/identifier-names";
import { prependIfAbsent } from "./util/string";

function getPackageDocs(node: ts.Node): string | undefined {
  if (
    ts.isJSDoc(node) &&
    node.tags?.some((tag) => tag.tagName.text === "packageDocumentation")
  ) {
    return node.getText();
  }

  return node.getChildren().map(getPackageDocs).find(Boolean);
}

async function main() {
  const [, , source, rollup] = process.argv;
  if (!source || !rollup) {
    console.error("Error: Source and rollup paths are required.");
    process.exit(1);
  }

  const sourceContents = await readFile(source, "utf-8");
  const sourceFile = ts.createSourceFile(
    source,
    sourceContents,
    ts.ScriptTarget.Latest,
    true
  );

  const docs = getPackageDocs(sourceFile);

  if (!docs) {
    console.warn("No package docs found.");
  }

  const rollupContents = await readFile(rollup, "utf-8");
  const rollupFile = ts.createSourceFile(
    rollup,
    rollupContents,
    ts.ScriptTarget.Latest,
    true
  );

  const result = [
    transformIdentifierNames,
    transformCombineAugmentations,
  ].reduceRight((node, transform) => transform(node) as SourceFile, rollupFile);

  const printer = ts.createPrinter();
  const finalOutput = printer.printFile(result);

  await writeFile(rollup, prependIfAbsent(finalOutput, docs ?? ""), "utf-8");
}

main().catch((error) => console.log("Error: ", error));
