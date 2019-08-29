import _ from 'lodash';

const getTab = depth => ' '.repeat(2 * depth);

const stringify = (value, depth) => {
  if (typeof value !== 'object') {
    return value;
  }
  const openTab = getTab(depth);
  const closeTab = getTab(depth - 1);
  const line = Object.keys(value).map(key => `${openTab}  ${key}: ${value[key]}`);
  const result = [...line, `${closeTab}}`].join('\n');
  return `{\n${result}`;
};

const transformer = {
  node: ({ name, children }, openTab, depth, fn) => {
    const formattedChildren = fn(children, depth + 2);
    return `${openTab}  ${name}: ${formattedChildren}`;
  },
  unchanged: ({ name, afterValue }, openTab, depth) => `${openTab}  ${name}: ${stringify(afterValue, depth + 2)}`,
  changed: ({ name, beforeValue, afterValue }, openTab, depth) => [
    `${openTab}- ${name}: ${stringify(beforeValue, depth + 2)}`,
    `${openTab}+ ${name}: ${stringify(afterValue, depth + 2)}`,
  ],
  added: ({ name, afterValue }, openTab, depth) => `${openTab}+ ${name}: ${stringify(afterValue, depth + 2)}`,
  removed: ({ name, beforeValue }, openTab, depth) => `${openTab}- ${name}: ${stringify(beforeValue, depth + 2)}`,
};

const render = (ast, depth = 1) => {
  const openTab = getTab(depth);
  const closeTab = getTab(depth - 1);
  const formattedAst = ast.map((node) => {
    const format = transformer[node.marker];
    return format(node, openTab, depth, render);
  });
  return `{\n${_.flatten(formattedAst).join('\n')}\n${closeTab}}`;
};

export default render;
