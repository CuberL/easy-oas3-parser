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
    constructor( 
        options: Partial<OAS3ObjectSchema> & { properties: {[K: string]: BaseNode} }
    ) {
        super()
        this.properties = options.properties;
        this.required = _.defaultTo(options.required, []);
        this.get = buildObjectGetFunction(this);
    }
}


export function parse(element: object): BaseNode {
    switch (element['type']) {
        case 'string': 
            return new StringNode(
                {
                    minLength: _.get(element, 'minLength'),
                    maxLength: _.get(element, 'maxLength'),
                    format: _.get(element, 'format'),
                    pattern: _.get(element, 'pattern')
                }
            )
        case 'number': 
            return new NumberNode(
                {
                    exclusiveMinimum: _.get(element, 'exclusiveMinimum'),
                    exclusiveMaximum: _.get(element, 'exclusiveMaximum'),
                    minimum: _.get(element, 'minimum'),
                    maximum: _.get(element, 'maximum'),
                    multipleOf: _.get(element, 'multipleOf')
                }
            )
        case 'object':
            return parseObject(element)
        case 'array':
            return parseArray(element)
        case 'null':
            return new NullNode()
        case 'boolean':
            return new BooleanNode()
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
        return parseObject(element)
    }
    if (_.get(element, 'enum')) {
        return new StringNode(
            {
                enums: _.get(element, 'enum') as Array<string>,
            }
        )
    }
    if (_.get(element, 'allOf')) {
        return parseAllOf(element['allOf'])
    }
    if (_.get(element, 'oneOf')) {
        return parseOneOf(element['oneOf'])
    }
    if (_.get(element, 'anyOf')) {
        return parseAnyOf(element['anyOf'])
    }
    
    return new BaseNode()
}

