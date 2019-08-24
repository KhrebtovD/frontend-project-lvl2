import commander from 'commander';

export default () => {
  const program = commander;
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-V, --version', 'output the version number')
    .parse(process.argv);
};
