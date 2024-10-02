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

import fs from "fs-extra";

async function copyFolder(src: string, dest: string): Promise<void> {
  try {
    await fs.copy(src, dest, { overwrite: true });
    console.log(`Folder copied from ${src} to ${dest} successfully!`);
  } catch (err) {
    console.error("Error during copy:", err);
    process.exit(1);
  }
}

function validateArgs() {
  const [, , src, dest] = process.argv;

  if (!src || !dest) {
    console.error("Error: Source and destination paths are required.");
    process.exit(1);
  }

  return { src, dest };
}

/**
 * Script for copying the post-processed api files to the wiki page.
 *
 * @example
 * ```sh
 * npx tsx export-api-reference.ts ./src ./dst
 * ```
 */
async function main() {
  const { src, dest } = validateArgs();
  await copyFolder(src, dest);
}

main();
