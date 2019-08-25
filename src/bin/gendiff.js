#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../gendiff';

const program = new commander.Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action(genDiff)
  .parse(process.argv);
