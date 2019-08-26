import parse from '../src/parser';

const data = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const dataINI = {
  host: 'hexlet.io',
  timeout: '50',
  proxy: '123.234.53.22',
  follow: false,
};

test.each([
  [`${__dirname}/__fixtures__/before.json`, data],
  [`${__dirname}/__fixtures__/before.yaml`, data],
  [`${__dirname}/__fixtures__/before.ini`, dataINI]])(
  'parser %#',
  (path, received) => {
    expect(parse(path)).toEqual(received);
  },
);
