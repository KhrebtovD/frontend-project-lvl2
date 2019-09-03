import path from 'path';
import fs from 'fs';
import parse from './parser';
import buildAst from './builder';
import render from './formatters';

const genDiff = (path1, path2, format) => {
  const originalData1 = fs.readFileSync(path1, 'utf8');
  const originalData2 = fs.readFileSync(path2, 'utf8');
  const parsedData1 = parse(originalData1, path.extname(path1));
  const parsedData2 = parse(originalData2, path.extname(path2));
  const ast = buildAst(parsedData1, parsedData2);
  const result = render(format)(ast);
  return result;
};

export default genDiff;
