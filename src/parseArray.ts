import * as _ from 'lodash';
import { parse, ArrayNode } from "./parse";

export function parseArray(element: object): ArrayNode {
    return new ArrayNode(parse(_.get(element, 'items')))
}
