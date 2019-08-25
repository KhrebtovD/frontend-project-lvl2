import fs from 'fs';
import gendiff from '../src/gendiff';

test('gendiff', () => {
  const data = fs.readFileSync(`${__dirname}/__fixtures__/first`, 'utf8');
  expect(gendiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`)).toBe(data);
});
