import program from 'commander';
import genDiff from './index.js';

export default () => {
  program
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]',  'output format')
    .command('compare <filepath1> <filepath2>')
    .action(genDiff);
    program.parse(process.argv);
  };

 