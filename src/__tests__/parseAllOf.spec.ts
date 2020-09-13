import { parseAllOf } from "../parseAllOf";
import { allOf } from "./__fixtures__/allof.json";

describe("parseAllOf", () => {
  test("Successfully parsed", () => {
    const allOf_parsed = parseAllOf(allOf);
    expect(allOf_parsed).toMatchInlineSnapshot(`
      ObjectNode {
        "get": [Function],
        "properties": Object {
          "field_1": StringNode {
            "enums": Array [],
            "format": null,
            "maxLength": null,
            "minLength": null,
            "pattern": null,
            "type": "string",
          },
          "field_2": StringNode {
            "enums": Array [],
            "format": null,
            "maxLength": null,
            "minLength": null,
            "pattern": null,
            "type": "string",
          },
          "field_3": NumberNode {
            "exclusiveMaximum": null,
            "exclusiveMinimum": null,
            "maximum": null,
            "minimum": null,
            "multipleOf": null,
            "type": "number",
          },
        },
        "required": Array [],
        "type": "object",
      }
    `);
  });
});
