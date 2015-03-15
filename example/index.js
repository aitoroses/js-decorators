import fs from 'fs';
import path from 'path';
import Compiler from '../lib/compiler';

// Arguments
var args = require('optimist').argv

// Instantiate compiler
var compiler = new Compiler();

// Read the file
try {
  if (args.file) {
    var file = fs.readFileSync(args.file);
    file = file.toString();
  } else {
    throw Error("No file specified.");
  }
} catch(e) {
  throw e;
}

// Lex the file
console.log(compiler.compile(file));
