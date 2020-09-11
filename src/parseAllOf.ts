import { parseObject } from "./parseObject";
import * as _ from 'lodash'
import { ObjectNode } from "./parse";

export function parseAllOf(element: Array<object>): ObjectNode {
    function getAllOfFields(_allOf: Array<object>): object {
		if (!_allOf) {
			return {}
		}
		return _.merge(
			{},
			..._allOf.map(sub_elem =>
				_.merge(
					{},
					_.get(sub_elem, 'properties'),
					getAllOfFields(_.get(sub_elem, 'allOf'))
				)
			)
		);
	};
	
	const allOf = parseObject(
		{
			type: 'object',
			properties: getAllOfFields(element)
		}
	)
	// console.log(allOf)
	return allOf
}
