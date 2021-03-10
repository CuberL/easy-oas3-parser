import * as _ from 'lodash';
import { parse, ObjectNode } from './parse'
import { BaseNode } from '.';
import { parseAllOf } from './parseAllOf';

function parseObjectProperties(properties: {[K: string]: object}): {[K: string]: BaseNode} {
    if (!properties) {
        return {}
    }

    return _.mapValues(
        properties,
        parse
    )
}

function parseObjectChildren(children: {type: string, name: string}[]): {[K: string]: BaseNode} {
    if (!children) {
        return {}
    }
    
    return _.fromPairs(
        _.map(
            children,
            ({type, name}) => [name, parse(
                {
                    type
                }
            )]
        )
    )
}

export function parseObject(element: object): ObjectNode {
    if (element['allOf']) {
        return parseAllOf(element['allOf']) as ObjectNode;
    }

    if (_.keys(_.get(element, 'properties')).length === 0 && _.size(_.get(element, 'children')) === 0) {
        return new ObjectNode({
            properties: {}
        });
    }
    
    const obj = new ObjectNode(
        {
            properties: _.merge(
                {},
                parseObjectProperties(_.get(element, 'properties')),
                parseObjectChildren(_.get(element, 'children'))
            ),
            required: _.get(element, 'required'),
            title: _.get(element, 'title')
        }
    )

    return obj
}
