'use strict';

const fs = require('fs');
const path = require('path');
const parse = require('../lib/parse');

const file = path.join(__dirname, 'tpl.md');
const str = fs.readFileSync(file, 'utf-8');

console.log(JSON.stringify(parse(str), null, 2));
