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

const parse = (pathToFile) => {
  const getFormat = pathToData => path.extname(pathToData);
  const getType = pathToData => types.find(({ name }) => name === getFormat(pathToData));

  const data = fs.readFileSync(pathToFile, 'utf8');
  const { process } = getType(pathToFile);
  return process(data);
};

export default parse;
