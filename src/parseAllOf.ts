import * as _ from 'lodash'
import { ObjectNode, OneOfNode, parse } from "./parse";
import mergeTwoObjectNode from './mergeTwoObjectNode'
import { parseObject } from './parseObject';


export function parseAllOf(elements: Array<object>): ObjectNode | OneOfNode {
	const allOf = elements.reduce((obj: ObjectNode, now: object) => {
		return mergeTwoObjectNode(obj, parseObject(now))
	}, new ObjectNode({properties: {}}))
	
	// FIXME: Only support one oneOf for now
	const one_ofs = elements.filter(element => element['oneOf'])
	if (one_ofs.length > 0) {
		const one_of_parsed = parse(one_ofs[0]) as OneOfNode
		return new OneOfNode(
			{
				cases: one_of_parsed.cases.map(
					_case => {
						if (_case.isObject()) {
							return mergeTwoObjectNode(allOf, _case);
						}
						return allOf
					}
				)
			}
		)
	}

	return allOf
}
