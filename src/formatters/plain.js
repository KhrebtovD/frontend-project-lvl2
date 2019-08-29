import _ from 'lodash';

const stringify = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const transformer = {
  node: ({ name, children }, path, fn) => {
    const newPath = `${path}${name}.`;
    return fn(children, newPath);
  },
  unchanged: () => null,
  changed: ({ name, beforeValue, afterValue }, path) => `Property '${path}${name}' was updated. From ${stringify(beforeValue)} to ${stringify(afterValue)}`,
  added: ({ name, afterValue }, path) => `Property '${path}${name}' was added with value: ${stringify(afterValue)}`,
  removed: ({ name }, path) => `Property '${path}${name}' was removed`,
};

const render = (ast, path = '') => {
  const formattedAst = ast.map((node) => {
    const format = transformer[node.marker];
    return format(node, path, render);
  }).filter(e => e !== null);
  return `${_.flatten(formattedAst).join('\n')}`;
};

export default render;
