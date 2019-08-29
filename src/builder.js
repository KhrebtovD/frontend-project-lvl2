import _ from 'lodash';

const createNode = (name, beforeValue, afterValue, children, marker) => ({
  name,
  beforeValue,
  afterValue,
  children,
  marker,
});

const correlation = [
  {
    check: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    process: (obj1, obj2, key, fn) => {
      const children = fn(obj1[key], obj2[key]);
      return createNode(key, null, null, children, 'node');
    },
  },
  {
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    process: (obj1, obj2, key) => createNode(key, obj1[key], null, [], 'removed'),
  },
  {
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    process: (obj1, obj2, key) => createNode(key, null, obj2[key], [], 'added'),
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: (obj1, obj2, key) => createNode(key, obj1[key], obj2[key], [], 'unchanged'),
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    process: (obj1, obj2, key) => createNode(key, obj1[key], obj2[key], [], 'changed'),
  },
];

const buildAst = (firstObj, secondObj) => {
  const keys = _.union(Object.keys(firstObj), Object.keys(secondObj)).sort();
  return keys.map((key) => {
    const builder = correlation.find(({ check }) => check(firstObj, secondObj, key));
    return builder.process(firstObj, secondObj, key, buildAst);
  });
};

export default buildAst;
