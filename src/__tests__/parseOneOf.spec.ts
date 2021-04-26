import { oneOf } from "./__fixtures__/oneof.json";
import { parseOneOf } from "../parseOneOf";

describe("parseOneOf", () => {
  test("Successfully parsed", () => {
    const oneof_parsed = parseOneOf(oneOf);
    expect(oneof_parsed).toMatchInlineSnapshot(`
      OneOfNode {
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
        "type": "oneOf",
      }
    `);
  });
});
