import { sortKeys } from './stylish.js';

const valueOutput = (value) => {
  switch (typeof value) {
    case 'object':
      if (value === null) return null;
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const comparePlain = (currentObj1, currentObj2, path = '') => {
  const mainObj = { ...currentObj1, ...currentObj2 };
  const keys = sortKeys(Object.keys(mainObj));
  const result = keys.flatMap((key) => {
    const value1 = currentObj1[key];
    const value2 = currentObj2[key];
    const currentPath = path === '' ? `${key}` : `${path}.${key}`;

    if (key in currentObj1 && key in currentObj2) {
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        return comparePlain(value1, value2, currentPath);
      }

      if (value1 === value2) {
        return [];
      }

      return `Property '${currentPath}' was updated. From ${valueOutput(
        value1,
      )} to ${valueOutput(value2)}`;
    }

    if (key in currentObj1) {
      return `Property '${currentPath}' was removed`;
    }

    return `Property '${currentPath}' was added with value: ${valueOutput(
      value2,
    )}`;
  });

  return result.join('\n');
};

export default comparePlain;
