#!/usr/bin/env node
import { Command } from 'commander';
import { cwd } from 'node:process';
import analizePath from '../src/parser.js';

const gendiff = () => {
  const program = new Command();

  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format <type>', 'output format', 'stylish')
    .action((first, second, options) => {
      if (options.format === 'stylish') {
        console.log(analizePath(first), analizePath(second), cwd());
      }
    });

  program.parse();
};

export default gendiff;
gendiff();
