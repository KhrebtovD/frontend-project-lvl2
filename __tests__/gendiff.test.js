import gendiff from '../src/gendiff';

test('gendiff', () => {
  const result = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  expect(gendiff('./examples/before.json', './examples/after.json')).toBe(result);
});
