import Parser from '../../src'
import * as fs from 'fs';

function main() {
    const file_content = fs.readFileSync(0).toString();
    const file_parsed = Parser(JSON.parse(file_content));

    if (file_parsed.isObject()) {
        console.log(file_parsed.get('data.shipments.N.order').type)
    }
}

main();
