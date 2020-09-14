import * as fs from 'fs';
import Parser from '../../src';
import { BaseNode } from '../../src'
import * as _ from 'lodash';
import * as yargs from 'yargs';

function toContextType(element: BaseNode): string {
    if (element.isArray()) {
        return `${toContextType(element.items)}[]`
    } else if (element.isBoolean()) {
        return `boolean`
    } else if (element.isNumber()) {
        return `number`
    } else if (element.isString()) {
        if (element.enums && element.enums.length > 0) {
            return element.enums.map(val => JSON.stringify(val)).join('|')
        }
        return `string`
    } else if (element.isObject()) {
        return '{' + _.map(
            _.toPairs(element.properties),
            ([k, v]) => `${k}: ${toContextType(v)}`
        ).join(';') + '}'
    } else if (element.isOneOf()) {
        return element.cases.map(toContextType).join('|')
    } else if (element.isAnyOf()) {
        return element.cases.map(toContextType).join('|')
    } else if (element.isNull()) {
        return 'null'
    }
    return 'any'
}

function main() {
    const { argv } = yargs
    const name: string = String(argv['name']);
    
    const file_content = fs.readFileSync(0).toString();
    const file_parsed = Parser(JSON.parse(file_content));

    file_parsed.isString() 

    process.stdout.write(
        `export interface ${name} ${toContextType(file_parsed)}`
    )
}

main()
