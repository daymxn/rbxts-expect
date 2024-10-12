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

import { CustomMethodImpl, extendMethods } from "@src/expect/extend";
import { ExpectMessageBuilder } from "@src/message";
import { place } from "@src/message/placeholders";
import {
  computeFullProxyPath,
  getNearestDefinedProxy,
  getProxyValue,
} from "@src/util/proxy";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} be `
)
  .name(`${place.actual.value} (${place.actual.type})`)
  .suffix(`, but it ${place.reason}`)
  .negationSuffix(", but it was");

const beDefined: CustomMethodImpl = (source, actual) => {
  const message = baseMessage.use(`defined`);

  if (actual === undefined) {
    if (source._proxy) {
      const nearestDefinedProxy = getNearestDefinedProxy(source._proxy);
      if (nearestDefinedProxy) {
        message.nestedMetadata({
          [computeFullProxyPath(nearestDefinedProxy) ?? "Actual"]:
            message.encode(getProxyValue(nearestDefinedProxy)),
        });
      } else {
        message.nestedMetadata({
          Actual: place.nil,
        });
      }
    }
    return message.name("the value").failWithReason("was undefined.");
  }

  return message
    .nestedMetadata({
      [place.path]: place.actual.value,
    })
    .pass();
};

const beUndefined: CustomMethodImpl = (_, actual) => {
  const message = baseMessage.use(`undefined`);

  if (actual === undefined) {
    return message.name("the value").pass();
  }

  return message
    .nestedMetadata({
      [place.path]: place.actual.value,
    })
    .failWithReason("was defined");
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    /**
     * Asserts that the actual value is a non `null` value.
     *
     * @example
     * ```ts
     * expect("Daymon").to.be.defined();
     * ```
     *
     * @see {@link Assertion.undefined | undefined}
     *
     * @public
     */
    defined(): this;

    /**
     * Asserts that the actual value is a non `null` value.
     *
     * @remarks
     * _Type alias for {@link Assertion.defined | defined}._
     *
     * @example
     * ```ts
     * expect("Daymon").to.be.ok();
     * ```
     *
     * @public
     */
    ok(): this;

    /**
     * Asserts that the actual value is a non `null` value.
     *
     * @remarks
     * _Type alias for {@link Assertion.defined | defined}._
     *
     * @example
     * ```ts
     * expect("Daymon").to.exist();
     * ```
     *
     * @public
     */
    exist(): this;

    /**
     * Asserts that the actual value is a non `null` value.
     *
     * @remarks
     * _Type alias for {@link Assertion.defined | defined}._
     *
     * @example
     * ```ts
     * expect("Daymon").to.be.a.thing.that.exists();
     * ```
     *
     * @public
     */
    exists(): this;

    /**
     * Asserts that the actual value is a `null` value.
     *
     * @example
     * ```ts
     * expect(undefined).to.be.undefined();
     * ```
     *
     * @see {@link Assertion.defined | defined}
     *
     * @public
     */
    undefined(): this;

    /**
     * Asserts that the actual value is a `null` value.
     *
     * @remarks
     * _Type alias for {@link Assertion.undefined | undefined}._
     *
     * @example
     * ```ts
     * expect(undefined).to.be.null();
     * ```
     *
     * @see {@link Assertion.defined | defined}
     *
     * @public
     */
    null(): this;

    /**
     * Asserts that the actual value is a `null` value.
     *
     * @remarks
     * _Type alias for {@link Assertion.undefined | undefined}._
     *
     * @example
     * ```ts
     * expect(undefined).to.be.nil();
     * ```
     *
     * @see {@link Assertion.defined | defined}
     *
     * @public
     */
    nil(): this;
  }
}

extendMethods({
  defined: beDefined,
  ok: beDefined,
  exist: beDefined,
  exists: beDefined,
  undefined: beUndefined,
  null: beUndefined,
  nil: beUndefined,
});
