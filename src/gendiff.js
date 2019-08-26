import parse from './parser';

const makeSort = (a, b) => {
  const key1 = a[1][0];
  const key2 = b[1][0];
  if (key1 > key2) {
    return 1;
  }
  if (key1 < key2) {
    return -1;
  }
  return 0;
};
const mergeIdenticProps = (array) => {
  const isSame = (a, b) => a[1] === b[1] && a[2] === b[2];
  const iter = (arr, acc) => {
    if (arr.length === 0) {
      return acc;
    }
    const [first, second] = arr;
    if (arr.length === 1) {
      return [...acc, first];
    }
    const marker = ' ';
    const newElem = isSame(first, second) ? [marker, first[1], first[2]] : first;
    const rest = isSame(first, second) ? arr.slice(2) : arr.slice(1);
    return iter(rest, [...acc, newElem]);
  };
  return iter(array, []);
};
const genDiff = (pathToFile1, pathToFile2) => {
  const buildArray = (data, marker) => Object.entries(data).map(prop => [marker, ...prop]);
  const data1 = buildArray(parse(pathToFile1), '-');
  const data2 = buildArray(parse(pathToFile2), '+');
  const commonArr = [...data1, ...data2];
  const sortedWithIdentic = mergeIdenticProps(commonArr.sort(makeSort));
  const body = sortedWithIdentic
    .map(e => [e[0], `${e[1]}:`, e[2]])
    .map(e => e.join(' ')).join('\n  ');
  const result = `{\n  ${body}\n}`;
  console.log(result);
  return result;
};

export default genDiff;
