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

import ts from "typescript";
import { recursivelyVisit } from "../util/transformers";

function renameDeclarations(
  node: ts.Node,
  renamedMap: Map<string, string>
): ts.Node {
  if (!ts.isDeclarationStatement(node)) return node;
  if (!node.name?.text.includes("$")) return node;

  const newName = node.name.text.replace(/\$\d+$/, "");

  renamedMap.set(node.name.text, newName);

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
      node.name.text
    );

    return node;
  }
}

function updateExports(
  node: ts.Node,
  renamedMap: Map<string, string>
): ts.Node | undefined {
  if (!ts.isExportDeclaration(node)) return node;
  if (!node.exportClause) return node;
  if (!ts.isNamedExports(node.exportClause)) return node;

  const updatedElements = node.exportClause.elements.map((element) => {
    const oldName = element.propertyName?.text ?? element.name.text;
    const renamedName = renamedMap.get(oldName);

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

export function transformIdentifierNames(source: ts.Node) {
  const renamedMap: Map<string, string> = new Map();

  const root = recursivelyVisit(source, (node) =>
    renameDeclarations(node, renamedMap)
  );

  return recursivelyVisit(root, (node) => updateExports(node, renamedMap));
}
