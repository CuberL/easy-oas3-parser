import * as schema_object_get from './__fixtures__/schema.object.get.json';
import { parse } from '../parse';

describe("buildObjectGetFunction", () => {
    test("Successfully found node using .get", () => {
        const schema_object_get_parsed = parse(schema_object_get);
        expect(schema_object_get_parsed.isObject() && schema_object_get_parsed.get("field_3.field_3_2.N.field_3_2_1").isString()).toBeTruthy()
    })

    test("Node not found using .get", () => {
        const schema_object_get_parsed = parse(schema_object_get);
        expect(schema_object_get_parsed.isObject());
        expect(schema_object_get_parsed.isObject() && schema_object_get_parsed.get("field_3.field_3_2.field_3_2_1").isString()).not.toBeTruthy();
    })
});