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
            "type": "string",
          },
          NullNode {
            "type": "null",
          },
        ],
        "type": "anyOf",
      }
    `);
  });
});
