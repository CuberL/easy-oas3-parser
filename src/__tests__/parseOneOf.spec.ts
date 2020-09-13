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
            "pattern": null,
            "type": "string",
          },
          NullNode {
            "type": "null",
          },
        ],
        "type": "oneOf",
      }
    `);
  });
});
