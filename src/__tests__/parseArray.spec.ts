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
          "format": null,
          "maxLength": null,
          "minLength": 3,
          "nullable": false,
          "pattern": null,
          "type": "string",
        },
        "nullable": false,
        "type": "array",
        "uniqueItems": true,
      }
    `);
  });
});
