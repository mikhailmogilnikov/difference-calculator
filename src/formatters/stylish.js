import _ from 'lodash';

const sortKeys = (file) => _.sortBy(file);

const breaker = '  ';

const compareStylish = (currentObj1, currentObj2, depth = 1) => {
  const mainObj = { ...currentObj1, ...currentObj2 };
  const keys = sortKeys(Object.keys(mainObj));
  const tab = breaker.repeat(depth);
  const result = keys.map((key) => {
    const value1 = currentObj1[key];
    const value2 = currentObj2[key];

    const stringifyValue = (value, depthStr) => {
      if (typeof value === 'object' && value !== null) {
        return compareStylish(value, value, depthStr + 2);
      }
      return value;
    };

    if (key in currentObj1 && key in currentObj2) {
      if (value1 === value2) {
        return `${tab}  ${key}: ${stringifyValue(value1, depth)}`;
      }

      if (typeof value1 === 'object' && typeof value2 === 'object') {
        return `${tab}  ${key}: ${compareStylish(value1, value2, depth + 2)}`;
      }

      return `${tab}- ${key}: ${stringifyValue(
        value1,
        depth,
      )}\n${tab}+ ${key}: ${stringifyValue(value2, depth)}`;
    }

    if (key in currentObj1) {
      return `${tab}- ${key}: ${stringifyValue(value1, depth)}`;
    }

    return `${tab}+ ${key}: ${stringifyValue(value2, depth)}`;
  });

  return `{\n${result.join('\n')}\n${'  '.repeat(depth - 1)}}`;
};

export { sortKeys };
export default compareStylish;
