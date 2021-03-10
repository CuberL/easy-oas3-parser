import * as object_properties from "./__fixtures__/object.properties.json";
import * as object_children from "./__fixtures__/object.children.json";
import * as object_no_properties from "./__fixtures__/object.no.properties.json";
import * as object_allof from "./__fixtures__/object.allof.json";
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
            "format": null,
            "maxLength": null,
            "minLength": null,
            "pattern": null,
            "type": "string",
          },
          "field_2": NumberNode {
            "exclusiveMaximum": null,
            "exclusiveMinimum": null,
            "maximum": null,
            "minimum": null,
            "multipleOf": null,
            "type": "number",
          },
        },
        "required": Array [
          "field_1",
        ],
        "title": null,
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
            "format": null,
            "maxLength": null,
            "minLength": null,
            "pattern": null,
            "type": "string",
          },
          "field_2": NullNode {
            "type": "null",
          },
        },
        "required": Array [],
        "title": "Title",
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
        "required": Array [],
        "title": null,
        "type": "object",
      }
    `);
  });

  test("Successfully parsed -> allOf", () => {
    const object_allof_parsed = parseObject(object_allof);
    expect(object_allof_parsed).toMatchInlineSnapshot(`
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
        "title": null,
        "type": "object",
      }
    `);
  });
});
