
import { ObjectNode } from "./parse";
import * as _ from 'lodash';

export default function mergeTwoObjectNode(source: ObjectNode, target: ObjectNode): ObjectNode {
	return new ObjectNode (
		{
			properties: {
				...source.properties,
				..._.mapValues(target.properties, (value, key) => {
					if (value.isObject() && source.properties[key]?.isObject()) {
						return mergeTwoObjectNode(value,source.properties[key] as ObjectNode)
					}
					return value;
				})
			}
		}
	)
}
