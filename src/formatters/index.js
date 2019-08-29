import tree from './tree';
import plain from './plain';
import json from './json';

export default (type) => {
  switch (type) {
    case 'tree':
      return tree;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      return tree;
  }
};
