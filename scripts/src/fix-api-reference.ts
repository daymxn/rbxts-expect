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

import { createReadStream, readdir, writeFile } from "fs-extra";
import { mkdir } from "fs/promises";
import { join, parse } from "path";
import { createInterface } from "readline";

// https://github.com/microsoft/rushstack/issues/2986
function fixMarkdown(line: string): string {
  return line.replace(/(\\(\*))|(\\(_))/g, "$2$4");
}

function fixLinks(line: string): string {
  return line.replace(/\\\[(.*?)\\\]\((https?:\/\/.*?)\\?\)/g, "[$1]($2)");
}

function fixMarkdownHeaders(line: string): string {
  // TODO(): markdown headers in javadocs are escaped (##, ###, etc.,)
  return line;
}

function fixTables(line: string): string {
  return line.startsWith("|") ? line.replace(/\\\|/g, "&#124;") : line;
}

function extractTitle(line: string): string | undefined {
  const match = line.match(/## (.*)/);
  return match?.[1];
}

function processLine(line: string, name: string): string | undefined {
  if (line.startsWith("<!--")) return undefined;

  const fixedLine = fixTables(fixLinks(fixMarkdown(line)));

  const homeLinkMatch = fixedLine.match(/\[Home\]\(.\/index\.md\) &gt; (.*)/);
  if (homeLinkMatch && homeLinkMatch[0]) {
    return name !== "expect" ? homeLinkMatch[1] : undefined;
  }

  return fixedLine;
}

async function processFile(
  rootDir: string,
  outputDir: string,
  file: string
): Promise<void> {
  const { name, ext } = parse(file);
  if (ext !== ".md") return;

  const docPath = join(rootDir, file);
  const outputPath = join(outputDir, file);
  const output: string[] = [];
  let title = "";

  const lines = createInterface({
    input: createReadStream(docPath),
    crlfDelay: Infinity,
  });

  for await (const line of lines) {
    const processedLine = processLine(line, name);
    if (processedLine === undefined) continue;

    if (!title) title = extractTitle(processedLine) || title;
    output.push(processedLine);
  }

  const header = [
    "---",
    `id: ${name}`,
    `title: ${title}`,
    `hide_title: true`,
    "---",
  ];
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, header.concat(output).join("\n"));
}

/**
 * Post-processing script for api docs generated by `api-extractor`.
 *
 * Fixes various issues that prevent the generated `md` files from being
 * used with docusaurus.
 *
 * @example
 * ```sh
 * npx tsx fix-api-reference.ts ./src ./dst
 * ```
 */
async function main() {
  const [, , src, dest] = process.argv;

  if (!src || !dest) {
    console.error("Error: Source and destination paths are required.");
    process.exit(1);
  }

  const files = await readdir(src);
  await Promise.all(files.map((file) => processFile(src, dest, file)));
}

main().catch((error) => console.error("Error:", error));
