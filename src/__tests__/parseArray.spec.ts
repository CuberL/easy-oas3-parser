import { parseAllOf } from "../parseAllOf";
import * as array from "./__fixtures__/array.json";
import { parseArray } from "../parseArray";

describe("parseArray", () => {
  test("Successfully parsed", () => {
    const array_parsed = parseArray(array);
    expect(array_parsed).toMatchInlineSnapshot(`
      ArrayNode {
        "items": StringNode {
          "enums": Array [],
          "type": "string",
        },
        "type": "array",
      }
    `);
  });
});
