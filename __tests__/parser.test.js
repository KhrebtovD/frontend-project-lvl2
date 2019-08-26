import parse from '../src/parser';

const data = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('parserJSON', () => {
  console.log(parse(`${__dirname}/__fixtures__/before.json`));
  expect(parse(`${__dirname}/__fixtures__/before.json`)).toEqual(data);
});

test('parserYAML', () => {
  expect(parse(`${__dirname}/__fixtures__/before.yaml`)).toEqual(data);
});
