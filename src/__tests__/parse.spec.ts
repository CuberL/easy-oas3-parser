import * as allof from "./__fixtures__/allof.json";
import * as oneof from "./__fixtures__/oneof.json";
import * as anyof from "./__fixtures__/anyof.json";
import * as oneof_array from "./__fixtures__/oneof.array.json";
import * as string_enum from "./__fixtures__/string.enum.json";
import * as number from "./__fixtures__/number.json";
import * as boolean from "./__fixtures__/boolean.json";
import * as string from "./__fixtures__/string.json";
import * as object from "./__fixtures__/object.properties.json";
import * as array from "./__fixtures__/array.json";
import * as null_type from "./__fixtures__/null.json";
import { parse } from "../parse";

describe("Parse", () => {
  test("Successfully parse -> allOf", () => {
    const parsed = parse(allof);
    expect(parsed.isObject()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      ObjectNode {
        "get": [Function],
        "properties": Object {
          "field_1": StringNode {
            "enums": Array [],
            "type": "string",
          },
          "field_2": StringNode {
            "enums": Array [],
            "type": "string",
          },
          "field_3": NumberNode {
            "type": "number",
          },
        },
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

  test("Successfully parse -> anyOf", () => {
    const parsed = parse(anyof);
    expect(parsed.isAnyOf()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
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

  test("Successfully parse -> oneOf, array", () => {
    const parsed = parse(oneof_array);
    expect(parsed.isOneOf()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      OneOfNode {
        "cases": Array [
          StringNode {
            "enums": Array [],
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

  test("Successfully parse -> string, enum", () => {
    const parsed = parse(string_enum);
    expect(parsed.isString()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      StringNode {
        "enums": Array [
          "enum_a",
          "enum_b",
        ],
        "type": "string",
      }
    `);
  });

  test("Successfully parse -> string", () => {
    const parsed = parse(string);
    expect(parsed.isString()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      StringNode {
        "enums": Array [],
        "type": "string",
      }
    `);
  });

  test("Successfully parse -> number", () => {
    const parsed = parse(number);
    expect(parsed.isNumber()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      NumberNode {
        "type": "number",
      }
    `);
  });

  test("Successfully parse -> boolean", () => {
    const parsed = parse(boolean);
    expect(parsed.isBoolean()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      BooleanNode {
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

  test("Successfully parse -> array", () => {
    const parsed = parse(array);
    expect(parsed.isArray()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      ArrayNode {
        "items": StringNode {
          "enums": Array [],
          "type": "string",
        },
        "type": "array",
      }
    `);
  });

  test("Successfully parse -> null", () => {
    const parsed = parse(null_type);
    expect(parsed.isNull()).toBeTruthy();
    expect(parsed).toMatchInlineSnapshot(`
      NullNode {
        "type": "null",
      }
    `);
  });

  test("Successfully parse -> unknown", () => {
    const parsed = parse({});
    expect(parsed).toMatchInlineSnapshot(`
      BaseNode {
        "type": "unknown",
      }
    `);
  });
});
