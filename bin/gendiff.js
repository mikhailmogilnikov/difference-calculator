#!/usr/bin/env node
import { Command } from 'commander';
import doCompareFlat from '../src/stylish.js';

const genDiff = () => {
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
        console.log(doCompareFlat(first, second));
      }
    });

  program.parse();
};

export default genDiff;
genDiff();
