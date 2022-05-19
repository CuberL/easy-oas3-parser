import * as _ from 'lodash';
import { SupportedDataTypeNames, ObjectGetFunction, OAS3NumberSchema, OAS3StringSchema, OAS3ArraySchema, OAS3ObjectSchema } from './types';
import { parseAllOf } from './parseAllOf';
import { parseOneOf } from './parseOneOf';
import { parseObject } from './parseObject';
import { parseArray } from './parseArray';
import { buildObjectGetFunction } from './buildObjectGetFunction';
import { parseAnyOf } from './parseAnyOf';
export class BaseNode {
    readonly type: SupportedDataTypeNames = 'unknown'
    nullable: boolean = false
    constructor() {

    }

    isArray(): this is ArrayNode {
        return this.type === 'array'
    }

    isBoolean(): this is BooleanNode {
        return this.type === 'boolean';
    }

    isString(): this is StringNode {
        return this.type === 'string'
    }

    isOneOf(): this is OneOfNode {
        return this.type === 'oneOf'
    }

    isAnyOf(): this is AnyOfNode {
        return this.type === 'anyOf'
    }

    isNull(): this is NullNode {
        return this.type === 'null'
    }

    isNumber(): this is NumberNode {
        return this.type === 'number'
    }
    
    isObject(): this is ObjectNode {
        return this.type === 'object'
    }

    setNullable(nullable: boolean) {
        this.nullable = nullable
    }

    isNullable(): boolean {
        return this.nullable
    }

    asArray(): ArrayNode {
        if (this.isArray()) {
            return this as ArrayNode
        }
        throw new Error(`It's not an array node`)
    }

    asBoolean(): BooleanNode {
        if (this.isBoolean()) {
            return this as BooleanNode
        }
        throw new Error(`It's not a boolean node`)
    }

    asString(): StringNode {
        if (this.isString()) {
            return this as StringNode
        }
        throw new Error(`It's not a string node`)
    }

    asOneOf(): OneOfNode {
        if (this.isOneOf()) {
            return this as OneOfNode
        }
        throw new Error(`It's not an oneOf node`)
    }

    asAnyOf(): AnyOfNode {
        if (this.isAnyOf()) {
            return this as AnyOfNode
        }
        throw new Error(`It's not an anyOf node`)
    }

    asNull(): NullNode {
        if (this.isNull()) {
            return this as NullNode
        }
        throw new Error(`It's not a null node`)
    }

    asNumber(): NumberNode {
        if (this.isNumber()) {
            return this as NumberNode
        }
        throw new Error(`It's not a number node`)
    }
    
    asObject(): ObjectNode {
        if (this.isObject()) {
            return this as ObjectNode
        }
        throw new Error(`It's not an object node`)
    }
}

export class ArrayNode extends BaseNode implements OAS3ArraySchema {
    items: BaseNode
    type: 'array' = 'array';
    uniqueItems: boolean;
    public _array: any;
    constructor(
        options: Partial<OAS3ArraySchema> & { items: BaseNode }
    ) {
        super()
        this.items = options.items 
        this.uniqueItems = _.defaultTo(options.uniqueItems, false);
    }
}

export class BooleanNode extends BaseNode {
    type: 'boolean' = 'boolean';
    constructor() {
        super()
    }
}

export class StringNode extends BaseNode implements OAS3StringSchema {
    type: 'string' = 'string';
    enums: string[] | null;
    minLength: number | null;
    maxLength: number | null;
    format: string | null;
    pattern: string | null;
    constructor(
        options: Partial<OAS3StringSchema & { enums: string[] }>
    ) {
        super()
        this.enums = _.defaultTo(options.enums, [])
        this.minLength = _.defaultTo(options.minLength, null)
        this.maxLength = _.defaultTo(options.maxLength, null)
        this.format = _.defaultTo(options.format, null)
        this.pattern = _.defaultTo(options.pattern, null)
    }
}

export class NullNode extends BaseNode {
    type: 'null' = 'null';
    constructor() {
        super()
    }
}

export class NumberNode extends BaseNode implements OAS3NumberSchema {
    type: 'number' = 'number';
    exclusiveMinimum: boolean | null
    exclusiveMaximum: boolean | null
    minimum: number | null
    maximum: number | null
    multipleOf: number | null
    constructor(options: Partial<OAS3NumberSchema>) {
        super()
        this.exclusiveMaximum = _.defaultTo(options.exclusiveMaximum, null)
        this.exclusiveMinimum = _.defaultTo(options.exclusiveMinimum, null)
        this.maximum = _.defaultTo(options.maximum, null)
        this.minimum = _.defaultTo(options.minimum, null)
        this.multipleOf = _.defaultTo(options.multipleOf, null)
    }
}

export class OneOfNode extends BaseNode {
    type: 'oneOf' = 'oneOf';
    cases: Array<BaseNode>
    constructor(options: {cases: Array<BaseNode>}) {
        super()
        this.cases = options.cases
    }
}

export class AnyOfNode extends BaseNode {
    type: 'anyOf' = 'anyOf'
    cases: Array<BaseNode>
    constructor(options: {cases: Array<BaseNode>}) {
        super()
        this.cases = options.cases;
    }
}

export class ObjectNode extends BaseNode implements OAS3ObjectSchema {
    type: 'object' = 'object';
    properties: {[K: string]: BaseNode}
    get: ObjectGetFunction
    required: string[]
    title: string | null
    constructor( 
        options: Partial<OAS3ObjectSchema> & { properties: {[K: string]: BaseNode} }
    ) {
        super()
        this.properties = options.properties;
        this.required = _.defaultTo(options.required, []);
        this.get = buildObjectGetFunction(this);
        this.title = _.defaultTo(options.title, null);
    }
}


export function parse(element: object): BaseNode {
    if (_.get(element, 'allOf')) {
        return parseAllOf(element['allOf'])
    }
    if (_.get(element, 'oneOf')) {
        return parseOneOf(element['oneOf'])
    }
    if (_.get(element, 'anyOf')) {
        return parseAnyOf(element['anyOf'])
    }
    switch (element['type']) {
        case 'string': 
            const node_string = new StringNode(
                {
                    enums: _.get(element, 'enum'),
                    minLength: _.get(element, 'minLength'),
                    maxLength: _.get(element, 'maxLength'),
                    format: _.get(element, 'format'),
                    pattern: _.get(element, 'pattern'),
                }
            )
            node_string.setNullable(element['nullable'] === true)
            return node_string;
        case 'number': 
        case 'integer':
            const node_number = new NumberNode(
                {
                    exclusiveMinimum: _.get(element, 'exclusiveMinimum'),
                    exclusiveMaximum: _.get(element, 'exclusiveMaximum'),
                    minimum: _.get(element, 'minimum'),
                    maximum: _.get(element, 'maximum'),
                    multipleOf: _.get(element, 'multipleOf')
                }
            )
            node_number.setNullable(element['nullable'] === true)
            return node_number;
        case 'object':
            const node_object = parseObject(element)
            node_object.setNullable(element['nullable'] === true)
            return node_object
        case 'array':
            const node_array = parseArray(element)
            node_array.setNullable(element['nullable'] === true)
            return node_array
        case 'null':
            return new NullNode()
        case 'boolean':
            const node_boolean = new BooleanNode()
            node_boolean.setNullable(element['nullable'] === true)
            return node_boolean
    }
    if (_.isArray(_.get(element, 'type'))) {
        return parseOneOf(
                     _.get(element, 'type').map(type => ({
                        ...element,
                        type
                    }))
        )
    }
    if (element['properties']) {
        const node_object = parseObject(element)
        node_object.setNullable(element['nullable'] === true)
        return node_object
    }
    if (_.get(element, 'enum')) {
        return new StringNode(
            {
                enums: _.get(element, 'enum') as Array<string>,
            }
        )
    }
    
    return new BaseNode()
}

