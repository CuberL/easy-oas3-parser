import mergeTwoObjectNode from "../mergeTwoObjectNode";
import { ObjectNode, parse } from "../parse";

describe("mergeTwoObjectNode", () => {
  test("merge", () => {
    const obj_1 = parse(require("./__fixtures__/object.3-level.1.json"));
    const obj_2 = parse(require("./__fixtures__/object.3-level.2.json"));

    expect(mergeTwoObjectNode(obj_1 as ObjectNode, obj_2 as ObjectNode))
      .toMatchInlineSnapshot(`
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
          "field_2": ObjectNode {
            "get": [Function],
            "properties": Object {
              "field_2_1": ObjectNode {
                "get": [Function],
                "properties": Object {
                  "field_2_1_1": StringNode {
                    "enums": Array [],
                    "format": null,
                    "maxLength": null,
                    "minLength": null,
                    "pattern": null,
                    "type": "string",
                  },
                },
                "required": Array [],
                "title": null,
                "type": "object",
              },
            },
            "required": Array [],
            "title": null,
            "type": "object",
          },
        },
        "required": Array [],
        "title": null,
        "type": "object",
      }
    `);
  });
});
