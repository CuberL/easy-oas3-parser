import * as object_properties from "./__fixtures__/object.properties.json";
import * as object_children from "./__fixtures__/object.children.json";
import * as object_no_properties from "./__fixtures__/object.no.properties.json";
import { parseObject } from "../parseObject";

describe("parseObject", () => {
  test("Successfully parsed -> properties", () => {
    const object_properties_parsed = parseObject(object_properties);
    expect(object_properties_parsed).toMatchInlineSnapshot(`
      ObjectNode {
        "get": [Function],
        "properties": Object {
          "field_1": StringNode {
            "enums": Array [],
            "type": "string",
          },
          "field_2": NumberNode {
            "type": "number",
          },
        },
        "type": "object",
      }
    `);
  });

  test("Successfully parsed -> children", () => {
    const object_children_parsed = parseObject(object_children);
    expect(object_children_parsed).toMatchInlineSnapshot(`
      ObjectNode {
        "get": [Function],
        "properties": Object {
          "field_1": StringNode {
            "enums": Array [],
            "type": "string",
          },
          "field_2": NullNode {
            "type": "null",
          },
        },
        "type": "object",
      }
    `);
  });

  test("Successfully parsed -> without properties", () => {
    const object_no_properties_parsed = parseObject(object_no_properties);
    expect(object_no_properties_parsed).toMatchInlineSnapshot(`
      ObjectNode {
        "get": [Function],
        "properties": Object {},
        "type": "object",
      }
    `);
  });
});
