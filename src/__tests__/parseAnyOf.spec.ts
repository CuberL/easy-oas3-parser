import { anyOf } from "./__fixtures__/anyof.json";
import { parseOneOf } from "../parseOneOf";
import { parseAnyOf } from "../parseAnyOf";

describe("parseAnyOf", () => {
  test("Successfully parsed", () => {
    const oneof_parsed = parseAnyOf(anyOf);
    expect(oneof_parsed).toMatchInlineSnapshot(`
      AnyOfNode {
        "cases": Array [
          StringNode {
            "enums": Array [],
            "format": null,
            "maxLength": null,
            "minLength": null,
            "nullable": false,
            "pattern": null,
            "type": "string",
          },
          NullNode {
            "nullable": false,
            "type": "null",
          },
        ],
        "nullable": false,
        "type": "anyOf",
      }
    `);
  });
});
