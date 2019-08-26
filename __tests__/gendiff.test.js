import fs from 'fs';
import gendiff from '../src/gendiff';

const data = fs.readFileSync(`${__dirname}/__fixtures__/gendiff`, 'utf8');

test('gendiff json', () => {
  expect(gendiff(`${__dirname}/__fixtures__/before.json`, `${__dirname}/__fixtures__/after.json`)).toEqual(data);
});

test('gendiff yaml', () => {
  expect(gendiff(`${__dirname}/__fixtures__/before.yaml`, `${__dirname}/__fixtures__/after.yaml`)).toEqual(data);
});
