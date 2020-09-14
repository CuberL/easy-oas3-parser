import { parseObject } from "./parseObject";
import * as _ from 'lodash'
import { ObjectNode, OneOfNode, parse } from "./parse";

export function parseAllOf(elements: Array<object>): ObjectNode | OneOfNode {
	const allOf = new ObjectNode({
		properties: _.merge(
			{},
			...elements.map(sub_element => {
				const sub_element_parsed = parse(sub_element);
				if (sub_element_parsed.isObject()) {
					return sub_element_parsed.properties
				}
			})
		)
	})

	// FIXME: Only support one oneOf for now
	const one_ofs = elements.filter(element => element['oneOf'])
	if (one_ofs.length > 0) {
		const one_of_parsed = parse(one_ofs[0]) as OneOfNode
		return new OneOfNode(
			{
				cases: one_of_parsed.cases.map(
					_case => {
						if (_case.isObject()) {
							return new ObjectNode(
								{
									properties: {
										..._case.properties,
										...allOf.properties
									}
								}
							)
						}
						return allOf
					}
				)
			}
		)
	}

	return allOf
}
