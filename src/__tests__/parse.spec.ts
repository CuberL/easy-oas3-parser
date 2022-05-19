import * as allof from "./__fixtures__/allof.json";
import * as oneof from "./__fixtures__/oneof.json";
import * as anyof from "./__fixtures__/anyof.json";
import * as oneof_array from "./__fixtures__/oneof.array.json";
import * as oneof_type_is_object from "./__fixtures__/oneof.type.object.json";
import * as string_enum from "./__fixtures__/string.enum.json";
import * as number from "./__fixtures__/number.json";
import * as boolean from "./__fixtures__/boolean.json";
import * as string from "./__fixtures__/string.json";
import * as nullable_string from "./__fixtures__/string.nullable.json";
import * as object from "./__fixtures__/object.properties.json";
import * as array from "./__fixtures__/array.json";
import * as null_type from "./__fixtures__/null.json";
import * as object_no_type from "./__fixtures__/object.no.type.json";
import * as oneof_array_properties from "./__fixtures__/oneof.array.properties.json";
import * as integer from "./__fixtures__/integer.json";
import { parse } from "../parse";

describe("Parse", () => {
  test("Successfully parse -> allOf", () => {
    const parsed = parse(allof);
    expect(parsed.isObject()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      ObjectNode {
        "get": [Function],
        "nullable": false,
        "properties": Object {
          "field_1": StringNode {
            "enums": Array [],
            "format": null,
            "maxLength": null,
            "minLength": null,
            "nullable": false,
            "pattern": null,
            "type": "string",
          },
          "field_2": StringNode {
            "enums": Array [],
            "format": null,
            "maxLength": null,
            "minLength": null,
            "nullable": false,
            "pattern": null,
            "type": "string",
          },
          "field_3": NumberNode {
            "exclusiveMaximum": null,
            "exclusiveMinimum": null,
            "maximum": null,
            "minimum": null,
            "multipleOf": null,
            "nullable": false,
            "type": "number",
          },
        },
        "required": Array [],
        "title": null,
        "type": "object",
      }
    `);
  });

  test("Successfully parse -> oneOf", () => {
    const parsed = parse(oneof);
    expect(parsed.isOneOf()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
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

  test("Successfully parse -> oneOf -> type is object", () => {
    const parsed = parse(oneof_type_is_object);
    expect(parsed.isOneOf()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      OneOfNode {
        "cases": Array [
          ObjectNode {
            "get": [Function],
            "nullable": false,
            "properties": Object {
              "field_1": StringNode {
                "enums": Array [],
                "format": null,
                "maxLength": null,
                "minLength": null,
                "nullable": false,
                "pattern": null,
                "type": "string",
              },
              "field_2": NumberNode {
                "exclusiveMaximum": null,
                "exclusiveMinimum": null,
                "maximum": null,
                "minimum": null,
                "multipleOf": null,
                "nullable": false,
                "type": "number",
              },
            },
            "required": Array [],
            "title": null,
            "type": "object",
          },
          ObjectNode {
            "get": [Function],
            "nullable": false,
            "properties": Object {
              "field_1": StringNode {
                "enums": Array [],
                "format": null,
                "maxLength": null,
                "minLength": null,
                "nullable": false,
                "pattern": null,
                "type": "string",
              },
              "field_2": NumberNode {
                "exclusiveMaximum": null,
                "exclusiveMinimum": null,
                "maximum": null,
                "minimum": null,
                "multipleOf": null,
                "nullable": false,
                "type": "number",
              },
            },
            "required": Array [],
            "title": null,
            "type": "object",
          },
        ],
        "nullable": false,
        "type": "oneOf",
      }
    `);
  });

  test("Successfully parse -> anyOf", () => {
    const parsed = parse(anyof);
    expect(parsed.isAnyOf()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
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

  test("Successfully parse -> oneOf, array", () => {
    const parsed = parse(oneof_array);
    expect(parsed.isOneOf()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
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

  test("Successfully parse -> oneOf, array, with properties", () => {
    const parsed = parse(oneof_array_properties);
    expect(parsed.isOneOf()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      OneOfNode {
        "cases": Array [
          ObjectNode {
            "get": [Function],
            "nullable": false,
            "properties": Object {
              "field": StringNode {
                "enums": Array [],
                "format": null,
                "maxLength": null,
                "minLength": null,
                "nullable": false,
                "pattern": null,
                "type": "string",
              },
            },
            "required": Array [],
            "title": null,
            "type": "object",
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

  test("Successfully parse -> string, enum", () => {
    const parsed = parse(string_enum);
    expect(parsed.isString()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      StringNode {
        "enums": Array [
          "enum_a",
          "enum_b",
        ],
        "format": null,
        "maxLength": null,
        "minLength": null,
        "nullable": false,
        "pattern": null,
        "type": "string",
      }
    `);
  });

  test("Successfully parse -> string", () => {
    const parsed = parse(string);
    expect(parsed.isString()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      StringNode {
        "enums": Array [
          "a",
        ],
        "format": "uuid",
        "maxLength": 36,
        "minLength": 1,
        "nullable": false,
        "pattern": "",
        "type": "string",
      }
    `);
  });

  test("Successfully parse -> string / nullable", () => {
    const parsed = parse(nullable_string);
    expect(parsed.isString()).toBeTruthy();
    expect(parsed.isNullable()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      StringNode {
        "enums": Array [
          "a",
        ],
        "format": "uuid",
        "maxLength": 36,
        "minLength": 1,
        "nullable": true,
        "pattern": "",
        "type": "string",
      }
    `);
  });

  test("Successfully parse -> number", () => {
    const parsed = parse(number);
    expect(parsed.isNumber()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      NumberNode {
        "exclusiveMaximum": false,
        "exclusiveMinimum": true,
        "maximum": 100,
        "minimum": 0,
        "multipleOf": 0,
        "nullable": false,
        "type": "number",
      }
    `);
  });

  test("Successfully parse -> integer", () => {
    const parsed = parse(integer);
    expect(parsed.isNumber()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      NumberNode {
        "exclusiveMaximum": false,
        "exclusiveMinimum": true,
        "maximum": 100,
        "minimum": 0,
        "multipleOf": 0,
        "nullable": false,
        "type": "number",
      }
    `);
  });

  test("Successfully parse -> boolean", () => {
    const parsed = parse(boolean);
    expect(parsed.isBoolean()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      BooleanNode {
        "nullable": false,
        "type": "boolean",
      }
    `);
  });

  test("Successfully parse -> object", () => {
    const parsed = parse(object);
    expect(parsed.isObject()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      ObjectNode {
        "get": [Function],
        "nullable": false,
        "properties": Object {
          "field_1": StringNode {
            "enums": Array [],
            "format": null,
            "maxLength": null,
            "minLength": null,
            "nullable": false,
            "pattern": null,
            "type": "string",
          },
          "field_2": NumberNode {
            "exclusiveMaximum": null,
            "exclusiveMinimum": null,
            "maximum": null,
            "minimum": null,
            "multipleOf": null,
            "nullable": false,
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

  test("Successfully parse -> object, without type", () => {
    const parsed = parse(object_no_type);
    expect(parsed.isObject()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      ObjectNode {
        "get": [Function],
        "nullable": false,
        "properties": Object {
          "field_1": StringNode {
            "enums": Array [],
            "format": null,
            "maxLength": null,
            "minLength": null,
            "nullable": false,
            "pattern": null,
            "type": "string",
          },
          "field_2": NumberNode {
            "exclusiveMaximum": null,
            "exclusiveMinimum": null,
            "maximum": null,
            "minimum": null,
            "multipleOf": null,
            "nullable": false,
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

  test("Successfully parse -> array", () => {
    const parsed = parse(array);
    expect(parsed.isArray()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
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

  test("Successfully parse -> null", () => {
    const parsed = parse(null_type);
    expect(parsed.isNull()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      NullNode {
        "nullable": false,
        "type": "null",
      }
    `);
  });

  test("Successfully parse -> unknown", () => {
    const parsed = parse({});
    expect(parsed).toMatchInlineSnapshot(`
      BaseNode {
        "nullable": false,
        "type": "unknown",
      }
    `);
  });
});
