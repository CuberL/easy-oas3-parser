import { ObjectGetFunction } from './types'
import * as _ from 'lodash';
import { ObjectNode, BaseNode, NullNode } from './parse';

export function buildObjectGetFunction (start_point: ObjectNode): ObjectGetFunction {
    return function (path: string): BaseNode {
        const path_splited = path.split('.');
        let last_node: BaseNode = start_point;
        _.forEach(path_splited, node => {
            if (node == 'N' && last_node.isArray()) {
                last_node = last_node.items
                return;
            }
            if (!last_node.isObject() || !last_node.properties[node]) {
                last_node = new NullNode();
                return false; 
            }
            last_node = last_node.properties[node];
        });
        return last_node;
    }
}
