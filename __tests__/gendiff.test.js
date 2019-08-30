import fs from 'fs';
import gendiff from '../src';

test.each([
  ['json', 'json'],
  ['json', 'tree'],
  ['json', 'plain'],
  ['yaml', 'json'],
  ['yaml', 'tree'],
  ['yaml', 'plain'],
  ['ini', 'json'],
  ['ini', 'tree'],
  ['ini', 'plain'],
])(
  'diff .%s in format "%s"',
  (fileExt, output) => {
    const pathToBefore = `${__dirname}/__fixtures__/before.${fileExt}`;
    const pathToAfter = `${__dirname}/__fixtures__/after.${fileExt}`;
    const data = fs.readFileSync(`${__dirname}/__fixtures__/${output}.txt`, 'utf8');
    expect(gendiff(pathToBefore, pathToAfter, output)).toEqual(data);
  },
);

test('diff without --format option', () => {
  const pathToBefore = `${__dirname}/__fixtures__/before.json`;
  const pathToAfter = `${__dirname}/__fixtures__/after.json`;
  const data = fs.readFileSync(`${__dirname}/__fixtures__/tree.txt`, 'utf8');
  expect(gendiff(pathToBefore, pathToAfter)).toEqual(data);
});
