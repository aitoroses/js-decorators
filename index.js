import fs from 'fs';
import path from 'path';
import {Lexer} from './lib/lexer';
import {Parser} from './lib/parser';

// Arguments
var args = require('optimist').argv

// Lexer and Parser
var lexer = new Lexer();
var parser = new Parser();

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
console.log(lexer.lex(file));
