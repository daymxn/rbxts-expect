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

class Combiner {
  private interfaceMap: { [key: string]: ts.InterfaceDeclaration } = {};
  private retainedNodes: ts.Node[] = [];

  protected constructor(public sourceFile: ts.SourceFile) {}

  public async build() {
    this.interfaceMap = {};
    this.retainedNodes = [];

    this.populate();

    for (const interfaceName in this.interfaceMap) {
      this.retainedNodes.push(this.interfaceMap[interfaceName]);
    }
  }

  private populate() {
    ts.forEachChild(this.sourceFile, (node) => {
      if (
        ts.isModuleDeclaration(node) &&
        node.body &&
        ts.isModuleBlock(node.body)
      ) {
        // Handle module augmentations
        const finalNodes = ts.visitNodes(
          node.body.statements,
          (modNode) => {
            if (ts.isInterfaceDeclaration(modNode)) {
              const interfaceName = modNode.name.text;

              // Check if interface already exists, if yes, merge
              if (this.interfaceMap[interfaceName]) {
                this.interfaceMap[interfaceName] = this.mergeInterfaceMembers(
                  this.interfaceMap[interfaceName],
                  modNode
                );
              } else {
                // If not, add it to the map
                this.interfaceMap[interfaceName] = modNode;
              }

              return undefined;
            } else {
              return modNode;
            }
          },
          ts.isStatement
        );

        if (finalNodes.length !== 0) {
          ts.factory.updateModuleBlock(node.body, finalNodes);

          this.retainedNodes.push(node);
        }
      } else if (ts.isInterfaceDeclaration(node)) {
        // Handle standalone interface declarations
        const interfaceName = node.name.text;

        // Check if this interface is already being augmented and merge it
        if (this.interfaceMap[interfaceName]) {
          this.interfaceMap[interfaceName] = this.mergeInterfaceMembers(
            this.interfaceMap[interfaceName],
            node
          );
        } else {
          // If not, add the original interface to the map
          this.interfaceMap[interfaceName] = node;
        }
      } else {
        // Retain all nodes that are not module augmentations (like imports, other exports)
        this.retainedNodes.push(node);
      }
    });
  }

  private mergeInterfaceMembers(
    target: ts.InterfaceDeclaration,
    source: ts.InterfaceDeclaration
  ) {
    const mergedMembers = [...target.members, ...source.members];
    return ts.factory.updateInterfaceDeclaration(
      target,
      target.modifiers,
      target.name,
      target.typeParameters,
      target.heritageClauses,
      ts.factory.createNodeArray(mergedMembers)
    );
  }

  public async output(outputDir: string) {
    // Create a printer to generate the output .d.ts file
    const printer = ts.createPrinter();
    let output = "";

    // Print all retained nodes (imports, other interfaces, merged interfaces, etc.)
    for (const node of this.retainedNodes) {
      output +=
        printer.printNode(ts.EmitHint.Unspecified, node, this.sourceFile) +
        "\n";
    }

    await mkdirp(outputDir);

    // Write the merged result back to a file
    return writeFile(`${outputDir}/index.d.ts`, output);
  }

  public static async from(sourcePath: string) {
    const source = await readFile(sourcePath, "utf-8");
    const sourceFile = ts.createSourceFile(
      sourcePath,
      source,
      ts.ScriptTarget.Latest,
      true
    );

    return new Combiner(sourceFile);
  }
}

async function main() {
  const [, , src, dest] = process.argv;
  if (!src || !dest) {
    console.error("Error: Source and destination paths are required.");
    process.exit(1);
  }

  const combiner = await Combiner.from(src);
  await combiner.build();
  await combiner.output(dest);
}

main().catch((error) => console.log("Error: ", error));
