import tree from './tree';
import plain from './plain';

export default (type) => {
  switch (type) {
    case 'tree':
      return tree;

    case 'plain':
      return plain;

    default:
      return tree;
  }
};
