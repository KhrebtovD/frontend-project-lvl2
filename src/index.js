import parse from './parser';
import buildAst from './builder';
import render from './formatters';

const genDiff = (path1, path2, format) => {
  const data1 = parse(path1);
  const data2 = parse(path2);
  const ast = buildAst(data1, data2);
  const result = render(format)(ast);
  return result;
};

export default genDiff;
