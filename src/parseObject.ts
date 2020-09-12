import * as _ from 'lodash';
import { parse, ObjectNode } from './parse'
import { BaseNode } from '.';

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
    if (_.keys(_.get(element, 'properties')).length === 0 && _.size(_.get(element, 'children')) === 0) {
        return new ObjectNode({});
    }
    
    const obj = new ObjectNode(_.merge(
        {},
        parseObjectProperties(_.get(element, 'properties')),
        parseObjectChildren(_.get(element, 'children'))
    ));

    return obj
}
