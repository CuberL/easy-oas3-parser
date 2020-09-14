import { parseAllOf } from "../parseAllOf";
import { allOf } from "./__fixtures__/allof.json";
import { allOf as allof_with_oneof } from "./__fixtures__/allof.with.oneof.json";

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

  test("Successfully parsed -> with oneof", () => {
    const allof_with_oneof_parsed = parseAllOf(allof_with_oneof);
    expect(allof_with_oneof_parsed).toMatchInlineSnapshot(`
      OneOfNode {
        "cases": Array [
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
              "field_4": StringNode {
                "enums": Array [],
                "format": null,
                "maxLength": null,
                "minLength": null,
                "pattern": null,
                "type": "string",
              },
            },
            "required": Array [],
            "type": "object",
          },
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
              "field_5": NumberNode {
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
          },
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
          },
        ],
        "type": "oneOf",
      }
    `);
  });
});
