/* eslint-disable headers/header-format */
/**
 * Test-agnostic assertion library for ROBLOX.
 *
 * @remarks
 * Exports the {@link expect} method as the primary entry point.
 *
 * @packageDocumentation
 */

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

import "./expect/extensions";

export {
  Assertion,
  CustomMethodImpl,
  CustomMethodImpls,
  EnumValue,
  ExpectConfig,
  ExpectMethodResult,
  Filter,
  InferArrayElement,
  LuaEnum,
  TypeCheckCallback,
  expect,
  extendMethods,
  extendNOPs,
  extendNegations,
  getDefaultExpectConfig,
  resetDefaultExpectConfig,
  setDefaultExpectConfig,
} from "./expect";

export {
  ActualPlaceholder,
  ExpectMessageBuilder,
  ExpectMessageBuilderOptions,
  ExpectedPlaceholder,
  Placeholder,
  VariableData,
  place,
} from "./message";

export {
  Proxy,
  ProxyInstance,
  computeFullProxyPath,
  createProxy,
  err,
  getNearestDefinedProxy,
  getProxyParent,
  getProxyPath,
  getProxyValue,
  isProxy,
  withProxy,
} from "./util";
