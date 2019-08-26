import fs from 'fs';
import gendiff from '../src/gendiff';

const data = fs.readFileSync(`${__dirname}/__fixtures__/gendiff`, 'utf8');

test.each([
  [`${__dirname}/__fixtures__/before.json`,
    `${__dirname}/__fixtures__/after.json`],
  [`${__dirname}/__fixtures__/before.yaml`,
    `${__dirname}/__fixtures__/after.yaml`],
  [`${__dirname}/__fixtures__/before.ini`,
    `${__dirname}/__fixtures__/after.ini`]])(
  'gendiff %#',
  (path1, path2) => {
    expect(gendiff(path1, path2)).toBe(data);
  },
);
