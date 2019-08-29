import fs from 'fs';
import gendiff from '../src';

const tree = fs.readFileSync(`${__dirname}/__fixtures__/tree.txt`, 'utf8');
const plain = fs.readFileSync(`${__dirname}/__fixtures__/plain.txt`, 'utf8');
const json = fs.readFileSync(`${__dirname}/__fixtures__/json.txt`, 'utf8');

const paths = [
  [`${__dirname}/__fixtures__/before.json`,
    `${__dirname}/__fixtures__/after.json`],
  [`${__dirname}/__fixtures__/before.yaml`,
    `${__dirname}/__fixtures__/after.yaml`],
  [`${__dirname}/__fixtures__/before.ini`,
    `${__dirname}/__fixtures__/after.ini`]];

test.each(paths)(
  'diff tree %#',
  (path1, path2) => {
    expect(gendiff(path1, path2, 'tree')).toBe(tree);
  },
);
test.each(paths)(
  'diff plain %#',
  (path1, path2) => {
    expect(gendiff(path1, path2, 'plain')).toBe(plain);
  },
);

test.each(paths)(
  'diff json %#',
  (path1, path2) => {
    expect(gendiff(path1, path2, 'json')).toBe(json);
  },
);

test('default renderer', () => {
  expect(gendiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`)).toBe(tree);
});
