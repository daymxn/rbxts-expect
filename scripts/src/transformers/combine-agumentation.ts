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

function populateInterfaces(
  root: ts.Node,
  interfaces: Record<string, ts.TypeElement[]>
) {
  return ts.visitEachChild(
    root,
    (node) => {
      if (!ts.isInterfaceDeclaration(node)) return node;

      const membersMap = interfaces[node.name.text];

      if (!membersMap) return node;

      return ts.factory.updateInterfaceDeclaration(
        node,
        node.modifiers,
        node.name,
        node.typeParameters,
        node.heritageClauses,
        ts.factory.createNodeArray([...node.members, ...membersMap])
      );
    },
    undefined
  );
}

function processModuleDeclarationBody(
  body: ts.ModuleBlock,
  interfaces: Record<string, ts.TypeElement[]>
) {
  return ts.visitNodes(
    body.statements,
    (node) => {
      if (ts.isInterfaceDeclaration(node)) {
        const interfaceName = node.name.text;

        if (interfaces[interfaceName]) {
          interfaces[interfaceName].push(...node.members);
        } else {
          interfaces[interfaceName] = [...node.members];
        }

        return undefined;
      } else {
        return node;
      }
    },
    ts.isStatement
  );
}

function processModuleDeclaration(
  node: ts.Node,
  interfaces: Record<string, ts.TypeElement[]>
) {
  if (!ts.isModuleDeclaration(node)) return node;
  if (!node.body || !ts.isModuleBlock(node.body)) return node;

  const remainingNodes = processModuleDeclarationBody(node.body, interfaces);
  if (!remainingNodes.length) return undefined;

  ts.factory.updateModuleBlock(node.body, remainingNodes);
  return node;
}

function collectAugmentedModules(
  source: ts.Node,
  interfaces: Record<string, ts.TypeElement[]>
) {
  return ts.visitEachChild(
    source,
    (node) => processModuleDeclaration(node, interfaces),
    undefined
  );
}

export function transformCombineAugmentations(source: ts.Node) {
  const interfaceMap: Record<string, ts.TypeElement[]> = {};

  const root = collectAugmentedModules(source, interfaceMap);

  return populateInterfaces(root, interfaceMap);
}
