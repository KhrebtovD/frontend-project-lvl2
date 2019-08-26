import yaml from 'js-yaml';
import ini from 'ini';
import path from 'path';
import fs from 'fs';

const types = [
  {
    name: '.json',
    process: data => JSON.parse(data),
  },
  {
    name: '.yaml',
    process: data => yaml.safeLoad(data),
  },
  {
    name: '.ini',
    process: data => ini.parse(data),
  },
];

const format = pathToFile => path.extname(pathToFile);
const getType = pathToFile => types.find(({ name }) => name === format(pathToFile));
const parse = (pathToFile) => {
  const data = pathToData => fs.readFileSync(pathToData, 'utf8');
  const { process } = getType(pathToFile);
  return process(data(pathToFile));
};

export default parse;
