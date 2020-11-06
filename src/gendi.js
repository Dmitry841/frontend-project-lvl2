
import program from 'commander';

program
  .option('-v, --vers <type>', 'yyy', 'ok');
program.parse(process.argv);

if (program.vers) {
    console.log(`1: ${program.vers}`);
}