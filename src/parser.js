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

const getFormat = pathToFile => path.extname(pathToFile);
const getType = pathToFile => types.find(({ name }) => name === getFormat(pathToFile));
const getData = pathToData => fs.readFileSync(pathToData, 'utf8');
const parse = (pathToFile) => {
  const { process } = getType(pathToFile);
  const data = getData(pathToFile);
  return process(data);
};

export default parse;
