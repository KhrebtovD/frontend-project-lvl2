import fs from 'fs';
import gendiff from '../src/gendiff';

const tree = fs.readFileSync(`${__dirname}/__fixtures__/tree`, 'utf8');
const plain = fs.readFileSync(`${__dirname}/__fixtures__/plain`, 'utf8');

test.each([
  [`${__dirname}/__fixtures__/before.json`,
    `${__dirname}/__fixtures__/after.json`],
  [`${__dirname}/__fixtures__/before.yaml`,
    `${__dirname}/__fixtures__/after.yaml`],
  [`${__dirname}/__fixtures__/before.ini`,
    `${__dirname}/__fixtures__/after.ini`]])(
  'diff tree %#',
  (path1, path2) => {
    expect(gendiff(path1, path2, 'tree')).toBe(tree);
  },
);
test.each([
  [`${__dirname}/__fixtures__/before.json`,
    `${__dirname}/__fixtures__/after.json`],
  [`${__dirname}/__fixtures__/before.yaml`,
    `${__dirname}/__fixtures__/after.yaml`],
  [`${__dirname}/__fixtures__/before.ini`,
    `${__dirname}/__fixtures__/after.ini`]])(
  'diff plain %#',
  (path1, path2) => {
    expect(gendiff(path1, path2, 'plain')).toBe(plain);
  },
);

test('default renderer', () => {
  expect(gendiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`)).toBe(tree);
});
