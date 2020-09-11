import * as _ from 'lodash';
import { SupportedDataTypeNames, ObjectGetFunction } from './types';
import { parseAllOf } from './parseAllOf';
import { parseOneOf } from './parseOneOf';
import { parseObject } from './parseObject';
import { parseArray } from './parseArray';
import { buildObjectGetFunction } from './buildObjectGetFunction';
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

export class ArrayNode extends BaseNode {
    items: BaseNode
    type: 'array' = 'array';
    public _array: any;
    constructor(items: BaseNode) {
        super()
        this.items = items;
    }
}

export class BooleanNode extends BaseNode {
    type: 'boolean' = 'boolean';
    constructor() {
        super()
    }
}

export class StringNode extends BaseNode {
    type: 'string' = 'string';
    enums: string[];
    constructor(enums: string[] = []) {
        super()
        this.enums = enums;
    }
}

export class NullNode extends BaseNode {
    type: 'null' = 'null';
    constructor() {
        super()
    }
}

export class NumberNode extends BaseNode {
    type: 'number' = 'number';
    constructor() {
        super()
    }
}

export class OneOfNode extends BaseNode {
    type: 'oneOf' = 'oneOf';
    cases: Array<BaseNode>
    constructor(cases: Array<BaseNode>) {
        super()
        this.cases = cases
    }
}

export class ObjectNode extends BaseNode {
    type: 'object' = 'object';
    properties: {[K: string]: BaseNode}
    get: ObjectGetFunction
    constructor(properties: {[K: string]: BaseNode}) {
        super()
        this.properties = properties
        this.get = buildObjectGetFunction(this)
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
        return parseOneOf(element['anyOf'])
    }
    if (_.isArray(_.get(element, 'type'))) {
        return parseOneOf(
                     _.get(element, 'type').map(type => ({
                        ...element,
                        type
                    }))
        )
    }
    if (_.get(element, 'enum')) {
        return new StringNode(_.get(element, 'enum') as Array<string>)
    }
    if (element['type'] === 'string') {
        return new StringNode()
    } else if (element['type'] === 'number' ) {
        return new NumberNode()
    } else if (element['type'] === 'object') {
        return parseObject(element)
    } else if (element['type'] === 'array') {
        return parseArray(element)
    } else if (element['type'] === 'null') {
        return new NullNode()
    } else if (element['type'] === 'boolean') {
        return new BooleanNode()
    }
    return new BaseNode()
}

