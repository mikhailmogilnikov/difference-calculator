import _ from 'lodash';
import analizePath from './parser.js';

const sortKeys = (file) => _.sortBy(file);

const compareStylish = (obj1, obj2) => {
  const breaker = '  ';
  const iter = (currentObj1, currentObj2, depth) => {
    const mainObj = { ...currentObj1, ...currentObj2 };
    const keys = sortKeys(Object.keys(mainObj));
    const tab = breaker.repeat(depth);
    const result = keys.map((key) => {
      const value1 = currentObj1[key];
      const value2 = currentObj2[key];

      const stringifyValue = (value, depthStr) => {
        if (typeof value === 'object' && value !== null) {
          return iter(value, value, depthStr + 2);
        }
        return value;
      };

      if (Object.prototype.hasOwnProperty.call(currentObj1, key)) {
        if (!Object.prototype.hasOwnProperty.call(currentObj2, key)) {
          return `${tab}- ${key}: ${stringifyValue(value1, depth)}`;
        }
        if (value1 === value2) {
          return `${tab}  ${key}: ${stringifyValue(value1, depth)}`;
        }
        if (typeof value1 === 'object' && typeof value2 === 'object') {
          return `${tab}  ${key}: ${iter(value1, value2, depth + 2)}`;
        }
        return `${tab}- ${key}: ${stringifyValue(
          value1,
          depth,
        )}\n${tab}+ ${key}: ${stringifyValue(value2, depth)}`;
      }

      if (!Object.prototype.hasOwnProperty.call(currentObj2, key)) {
        return `${tab}- ${key}: ${stringifyValue(value1, depth)}`;
      }
      return `${tab}+ ${key}: ${stringifyValue(value2, depth)}`;
    });

    return `{\n${result.join('\n')}\n${'  '.repeat(depth - 1)}}`;
  };

  return iter(obj1, obj2, 1);
};

const doCompareStylish = (file1, file2) => {
  const fileParsed1 = analizePath(file1);
  const fileParsed2 = analizePath(file2);
  return compareStylish(fileParsed1, fileParsed2);
};

export { sortKeys, compareStylish };
export default doCompareStylish;
