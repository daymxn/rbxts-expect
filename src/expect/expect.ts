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

/**
 * Gets the full stack trace of file names.
 *
 * @returns An array of file names, with the first being the top of the stack
 */
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

/**
 * How many levels out from the error function are we to the end-user's code.
 *
 * Used to provide proper stack tracing
 *
 * @remarks
 * We dynamically get this per throw, instead of getting it on startup.
 *
 * This is to solve the issue of extension libs. If we cached the stack level on startup,
 * then extension libs would have the wrong stack level.
 *
 * @returns The stack level as a number
 */
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

/**
 * Variable for checking if we're running within a TestEZ test.
 *
 * Used because error messages come out different when running under TestEZ versus
 * prod, so we use this to toggle certain behaviors to make test failures easier
 * to read.
 *
 * @remarks
 * A bit of an implementation detail on TestEZ's part, but since it isn't maintained
 * we should be fine.
 */
const isTesting = (_G as Record<string, boolean>)["RUNNING_GLOBAL"];

/**
 * Maps predefined assertion callbacks to proper methods, and propogates
 * the "actual" value accordingly.
 *
 * @remarks
 * We do this at the start to not only centralize the logic, but
 * help in performance.
 *
 * @param method - The assertion callback to map.
 * @param value - The "actual" value of the assertion.
 *
 * @returns A method version of the callback.
 */
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

/**
 * Perform assertions/checks on the state of a value.
 *
 * @remarks
 * The `value` you provide is reffered to as the "actual" value.
 *
 * You can then use the instance returned by `expect` to make various
 * "assertions" about the state of the value. `expect` will throw
 * a descriptive error message if any of the checks fail.
 *
 * For a full list of available checks, take a look at the
 * [API](https://rbxts-expect.daymxn.com/docs/api).
 *
 * @param value - The "actual" value to perform checks against.
 *
 * @returns An instance of {@link Assertion} that you should chain for checks.
 *
 * @example
 * ```ts
 * expect(5).to.equal(5);
 *
 * expect("Daymon").to.have.the.substring("Day");
 *
 * expect([1,2,3]).to.include(1).but.not.include(4);
 *
 * expect(Sport.Basketball).to.be.the.enum(Sport).and.to.be.oneOf(["Basketball", "Soccer"]);
 * ```
 *
 * @public
 */
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
