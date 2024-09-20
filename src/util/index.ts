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

// TODO move utils to their own files and then just export them all through this like normal index files, and update their usages

export {
  ProxyInstance,
  getProxyParent,
  getProxyPath,
  getProxyValue,
  isProxy,
  proxy,
  withProxy,
} from "./proxy";
export { err } from "./tests";
