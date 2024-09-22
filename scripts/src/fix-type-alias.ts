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

import { mkdirp, readFile, writeFile } from "fs-extra";
import ts from "typescript";

class Renamer {
  private renamedNodes: ts.Node[] = [];
  private renamedMap: Map<string, string> = new Map();

  protected constructor(public sourceFile: ts.SourceFile) {}

  public async build() {
    this.renamedNodes = [];
    this.renamedMap = new Map();
    this.renameIdentifiers();
  }

  private renameIdentifiers() {
    const visitNode = (node: ts.Node): ts.Node | undefined => {
      // Handle type and interface declarations with $number
      if (
        (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) &&
        node.name.text.includes("$")
      ) {
        const newName = node.name.text.replace(/\$\d+$/, ""); // Remove $number suffix

        // Store old-to-new name mapping
        this.renamedMap.set(node.name.text, newName);

        // Update the node with the new name
        if (ts.isTypeAliasDeclaration(node)) {
          return ts.factory.updateTypeAliasDeclaration(
            node,
            node.modifiers,
            ts.factory.createIdentifier(newName),
            node.typeParameters,
            node.type
          );
        } else if (ts.isInterfaceDeclaration(node)) {
          return ts.factory.updateInterfaceDeclaration(
            node,
            node.modifiers,
            ts.factory.createIdentifier(newName),
            node.typeParameters,
            node.heritageClauses,
            node.members
          );
        }
      }

      // Handle export declarations and update references
      if (
        ts.isExportDeclaration(node) &&
        node.exportClause &&
        ts.isNamedExports(node.exportClause)
      ) {
        const updatedElements = node.exportClause.elements.map((element) => {
          const oldName = element.propertyName?.text ?? element.name.text;
          const renamedName = this.renamedMap.get(oldName);

          // If old name was renamed, update export
          if (renamedName) {
            return ts.factory.updateExportSpecifier(
              element,
              element.isTypeOnly,
              undefined,
              ts.factory.createIdentifier(renamedName)
            );
          }
          return element; // No change
        });

        return ts.factory.updateExportDeclaration(
          node,
          node.modifiers,
          node.isTypeOnly,
          node.exportClause
            ? ts.factory.updateNamedExports(node.exportClause, updatedElements)
            : undefined,
          node.moduleSpecifier,
          node.attributes
        );
      }

      // Recursively visit children
      return ts.visitEachChild(node, visitNode, undefined);
    };

    // Traverse the AST and modify nodes
    const updatedSourceFile = ts.visitNode(this.sourceFile, visitNode);

    // Retain the updated nodes
    if (updatedSourceFile) {
      ts.forEachChild(updatedSourceFile, (node) => {
        this.renamedNodes.push(node);
      });
    }
  }

  public async output(outputDir: string) {
    const printer = ts.createPrinter();
    let output = "";

    // Print all renamed nodes
    for (const node of this.renamedNodes) {
      output +=
        printer.printNode(ts.EmitHint.Unspecified, node, this.sourceFile) +
        "\n";
    }

    await mkdirp(outputDir);

    // Write the renamed result back to a file
    return writeFile(`${outputDir}/renamed_index.d.ts`, output);
  }

  public static async from(sourcePath: string) {
    const source = await readFile(sourcePath, "utf-8");
    const sourceFile = ts.createSourceFile(
      sourcePath,
      source,
      ts.ScriptTarget.Latest,
      true
    );

    return new Renamer(sourceFile);
  }
}

async function main() {
  const [, , src, dest] = process.argv;
  if (!src || !dest) {
    console.error("Error: Source and destination paths are required.");
    process.exit(1);
  }

  const renamer = await Renamer.from(src);
  await renamer.build();
  await renamer.output(dest);
}

main().catch((error) => console.log("Error: ", error));
