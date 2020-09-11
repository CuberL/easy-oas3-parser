import * as _ from 'lodash';
import { parse, ObjectNode } from './parse'

export function parseObject(element: object): ObjectNode {
    if (_.keys(_.get(element, 'properties')).length === 0 && _.size(_.get(element, 'children')) === 0) {
        return new ObjectNode({});
    }
    
    const obj = new ObjectNode(_.mapValues(
        _.get(element, 'properties'),
        parse
    ))
    return obj
}
