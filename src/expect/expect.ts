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

import { Assertion } from "@rbxts/expect";
import Object from "@rbxts/object-utils";
import { reverseArray } from "@rbxts/reverse-array";
import { includes } from "@rbxts/string-utils";
import { mapObjectValues } from "@src/util/object";
import { computeFullProxyPath, isProxy } from "@src/util/proxy";
import { getNegationExtensions, getNOPExtensions } from "./extend";
import { CustomMethodImpl, getMethodExtensions } from "./extend/methods";

function getTraceBack() {
  let level = 1;
  let file;

  const traceback = [];

  do {
    [file] = debug.info(level++, "s");
    traceback.push(file);
  } while (file !== undefined);

  return reverseArray(traceback);
}

// how many levels out from the error function until the calling code
// used to provide proper stack tracing
// TODO(): allow users to override this, or disable it (we just throw instead, or use their static number)
// then in my tests I can disable it instead of relying on isTesting
// but maybe I keep it for extension libs
// note that we dynamically get this per throw, in case of extension libs
// but if you pass around your assertion it won't work properly (don't do that)
function discoverStackLevel() {
  const trace = getTraceBack();

  const expectLevel = trace.findIndex(
    (file) =>
      includes(file, "TS.expect") ||
      includes(file, "rbxts_include.node_modules.@rbxts.expect")
  );
  const targetLevel = trace.size() - expectLevel - 1;

  return targetLevel;
}

// set by test-ez, bit of an implementation detail but testez isn't maintained so we should be fine
// used because the error message comes out different when running under test ez versus prod
const isTesting = (_G as Record<string, boolean>)["RUNNING_GLOBAL"];

function MapAssertion<T>(method: CustomMethodImpl<unknown>, value: T) {
  return (source: Assertion<T>, ...args: never[]) => {
    const result = method(source, value, ...args);

    return result.match(
      (message) => {
        if (source._negated) {
          if (source._proxy) {
            message.path(computeFullProxyPath(source._proxy));
          }

          if (isTesting) {
            throw message.actualValue(value).build(true, true);
          } else {
            error(
              message.actualValue(value).build(true, true),
              discoverStackLevel()
            );
          }
        }
        return source;
      },
      (message) => {
        if (source._negated) {
          return source;
        }

        if (source._proxy) {
          message.path(computeFullProxyPath(source._proxy));
        }

        if (isTesting) {
          throw message.actualValue(value).build(false, false);
        } else {
          error(
            message.actualValue(value).build(false, false),
            discoverStackLevel()
          );
        }
      }
    );
  };
}

export function expect<T>(value: T): Assertion<T> {
  const newAssert: Record<string, unknown> = {
    _negated: false,
  };

  if (isProxy(value)) {
    newAssert.value = value._proxy_value;
    newAssert._proxy = value;
  } else {
    newAssert.value = value;
  }

  const mappedAssertions = mapObjectValues(getMethodExtensions(), (method) =>
    MapAssertion(method, newAssert.value)
  );

  Object.assign(newAssert, mappedAssertions);

  for (const key of getNOPExtensions()) {
    newAssert[key] = newAssert;
  }

  const negations = getNegationExtensions();

  return setmetatable(newAssert as unknown as Assertion<T>, {
    __index: (t, key) => {
      const k = key as string;

      if (negations.has(k)) {
        t._negated = !t._negated;
        return t;
      }

      return rawget(t, key);
    },
  });
}

/**
 * I also still need to implement proxy support here.
 *
 * But on another note, I'm realizing that probably most of the messages would change in the context of a proxy/table
 * ```
 * // without proxy
 * Expected 5 (number) to equal "5" (string).
 *
 * // intended with proxy
 * Expected parent.age to equal "5" (string), but it was 5 (number) instead.
 * ```
 *
 * We _could_ just adapt and do like
 * ```
 * // without proxy
 * Expected the value to equal "5" (string), but it was 5 (number) instead.
 * ```
 *
 * But do we want that?
 *
 * I'm doing this all to support nested property checking, but is that realistic?
 * Do we really care about nested property checking that much? Or would we rather just have
 * support for matching against objects?
 *
 * The drawback is we can't do non deterministic checks like
 * ```
 * expect(person).to.match({
 *   age: not.empty();
 * });
 * ```
 */
