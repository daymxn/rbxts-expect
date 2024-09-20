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

import type { expect } from "@src/expect";
import type { Placeholder } from "@src/message";

/**
 * Configuration setting for {@link expect}.
 *
 * Configuration is generally used inline as needed, as the concept of `except` instances doesn't really exist.
 *
 * @see {@link setDefaultExpectConfig}, {@link getDefaultExpectConfig}, {@link resetDefaultExpectConfig}
 *
 * @public
 */
export interface ExpectConfig {
  /**
   * The length at which collapsible values become collapsed variants.
   *
   * @defaultValue `20`
   *
   * @remarks
   * When actual/expected values are beyond this length in size (as strings), they
   * are converted into "collapsed" versions of themselves.
   *
   * Arrays are collapsed to `[...]`
   * Objects are collapsed to `{...}`
   * Strings are collapsed to `"..."`
   * And everything else is collapsed to `'...'`
   *
   * @see {@link Placeholder.actual.fullValue | fullValue}
   */
  collapseLength: number;
}

const baselineExpectConfig: Readonly<ExpectConfig> = {
  collapseLength: 20,
};

let defaultConfig: ExpectConfig = {
  ...baselineExpectConfig,
};

/**
 * Sets the default {@link ExpectConfig}.
 *
 * @remarks
 * Will override any previous configuration set. It does _not_ merge them.
 *
 * @param config - Partial {@link ExpectConfig} with settings to use.
 *
 * @see {@link resetDefaultExpectConfig}, {@link getDefaultExpectConfig}
 *
 * @public
 */
export function setDefaultExpectConfig(config: Partial<ExpectConfig>) {
  defaultConfig = {
    ...baselineExpectConfig,
    ...config,
  };
}

/**
 * Resets the default {@link ExpectConfig}.
 *
 * @remarks
 * Effectively the same as if you had never called {@link setDefaultExpectConfig}.
 *
 * @see {@link setDefaultExpectConfig}, {@link getDefaultExpectConfig}
 *
 * @public
 */
export function resetDefaultExpectConfig() {
  defaultConfig = {
    ...baselineExpectConfig,
  };
}

/**
 * Gets the (current) default {@link ExpectConfig}.
 *
 * @remarks
 * Will use the baseline settings if the user hasn't called {@link setDefaultExpectConfig}.
 *
 * Instead of saving a reference to the config, consumers are expected to call this
 * whenever they need the config.
 *
 * _The returned config is a deep copy, so you can safely mutate it without impacting others._
 *
 * @see {@link resetDefaultExpectConfig}, {@link setDefaultExpectConfig}
 *
 * @public
 */
export function getDefaultExpectConfig(): ExpectConfig {
  return {
    ...defaultConfig,
  };
}
