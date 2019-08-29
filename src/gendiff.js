import parse from './parser';
import buildAst from './builder';
import render from './renderer';

const genDiff = (pathToFile1, pathToFile2) => {
  const data1 = parse(pathToFile1);
  const data2 = parse(pathToFile2);
  const ast = buildAst(data1, data2);
  const result = render(ast);
  console.log(result);
  return result;
};

export default genDiff;
