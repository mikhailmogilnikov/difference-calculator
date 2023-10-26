import { sortKeys } from './stylish.js';

const compareJson = (currentObj1, currentObj2) => {
  const mainObj = { ...currentObj1, ...currentObj2 };
  const keys = sortKeys(Object.keys(mainObj));
  const result = keys.map((key) => {
    const value1 = currentObj1[key];
    const value2 = currentObj2[key];

    const stringifyValue = (value) => {
      if (typeof value === 'object' && value !== null) {
        return compareJson(value, value);
      }
      return value;
    };

    if (key in currentObj1 && key in currentObj2) {
      if (value1 === value2) {
        return { name: key, value: stringifyValue(value1) };
      }

      if (typeof value1 === 'object' && typeof value2 === 'object') {
        return { name: key, value: compareJson(value1, value2) };
      }

      return {
        name: key,
        status: 'changed',
        valueBefore: stringifyValue(value1),
        valueAfter: stringifyValue(value2),
      };
    }

    if (key in currentObj1) {
      return {
        name: key,
        status: 'removed',
        value: stringifyValue(value1),
      };
    }

		return {
			name: key,
			status: 'added',
			value: stringifyValue(value2),
		};
  });

  return JSON.stringify(result);
};

export default compareJson;
