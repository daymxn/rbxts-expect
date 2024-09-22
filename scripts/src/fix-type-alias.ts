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
  private renamedMap: Map<string, string> = new Map();
  private root: ts.Node | undefined = undefined;

  protected constructor(public sourceFile: ts.SourceFile) {}

  public async build() {
    this.renamedMap = new Map();
    this.renameIdentifiers();
  }

  // rename name$number declarations to name
  private renameDeclarations(node: ts.Node): ts.Node | undefined {
    if (ts.isDeclarationStatement(node) && node.name?.text.includes("$")) {
      const newName = node.name.text.replace(/\$\d+$/, "");

      this.renamedMap.set(node.name.text, newName);

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
      } else {
        console.warn(
          "Unsupported declaration type found (%s): %s",
          node.kind,
          node.name
        );
      }
    }
  }

  private updateExports(node: ts.Node): ts.Node | undefined {
    if (
      ts.isExportDeclaration(node) &&
      node.exportClause &&
      ts.isNamedExports(node.exportClause)
    ) {
      const updatedElements = node.exportClause.elements.map((element) => {
        const oldName = element.propertyName?.text ?? element.name.text;
        const renamedName = this.renamedMap.get(oldName);

        if (renamedName) {
          return ts.factory.updateExportSpecifier(
            element,
            element.isTypeOnly,
            undefined,
            ts.factory.createIdentifier(renamedName)
          );
        }

        return element;
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
  }

  private renameIdentifiers() {
    const visitNode = (node: ts.Node): ts.Node | undefined => {
      return (
        this.renameDeclarations(node) ??
        this.updateExports(node) ??
        ts.visitEachChild(node, visitNode, undefined)
      );
    };

    this.root = ts.visitNode(this.sourceFile, visitNode);
  }

  public async output(outputDir: string) {
    const printer = ts.createPrinter();
    let output = "";

    if (this.root) {
      output += printer.printNode(
        ts.EmitHint.SourceFile,
        this.root,
        this.sourceFile
      );
    }

    await mkdirp(outputDir);

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
