## easy-oas3-parser

[![Build Status](https://img.shields.io/travis/cuberl/easy-oas3-parser)](https://travis-ci.org/CuberL/easy-oas3-parser)
[![Coverage Status](https://img.shields.io/coveralls/github/CuberL/easy-oas3-parser)](https://coveralls.io/github/CuberL/easy-oas3-parser?branch=master)
[![License](https://img.shields.io/github/license/cuberl/easy-oas3-parser?color=blue)](https://github.com/CuberL/easy-oas3-parser/blob/master/LICENSE)
[![Version](https://img.shields.io/npm/v/easy-oas3-parser)](https://www.npmjs.com/package/easy-oas3-parser)

### Installation

Install to your projects
``` sh
yarn add easy-oas3-parser
```

### Usage

``` typescript
import Parser from 'easy-oas3-parser'
import * as fs from 'fs'

const schema = fs.readFileSync('example.json');
const schema_parsed = Parser(JSON.parse(schema.toString()))

// judge if it's an object
if (schema_parsed.isObject()) {
    // get properties of this object type node
    console.log(schema_parsed.properties);
    // get node by path
    console.log(schema_parsed.get('a.b.c'));
}
```

For more examples, take a look at `/example`


### Know issues

- All cases need to be arranged if oneOf appears in allOf. But it's too complex. Only one oneOf is allowed in allOf for now.
