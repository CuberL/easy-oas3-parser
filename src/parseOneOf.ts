import * as _ from 'lodash';
import { parse, OneOfNode } from "./parse";

export function parseOneOf(element: Array<any>): OneOfNode {
    return new OneOfNode(element.map(parse))
}
