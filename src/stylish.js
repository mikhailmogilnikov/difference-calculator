import _ from 'lodash';
import analizePath from './parser.js';

const sortKeys = (file) => _.sortBy(file);

const compareFilesFlat = (parsedFile1, parsedFile2) => {
  const mainObj = { ...parsedFile1, ...parsedFile2 };
  const keys = sortKeys(Object.keys(mainObj));
  return keys.reduce((acc, key) => {
    let accCopy = acc;
    const value = mainObj[key];
    const value1 = parsedFile1[key];
    const value2 = parsedFile2[key];
    if (value1 === value && value2 !== value) {
      accCopy = [...accCopy, [' -', `${key}:`, value1]];
    }
    if (value1 !== value && value2 === value) {
      if (value1 !== undefined) {
        accCopy = [...accCopy, [' -', `${key}:`, value1]];
      }
      accCopy = [...accCopy, [' +', `${key}:`, value2]];
    }
    if (value1 === value && value2 === value) {
      accCopy = [...accCopy, ['  ', `${key}:`, value]];
    }

    return accCopy;
  }, []);
};

const buildString = (comparedArray) => {
  const strings = comparedArray.map((arr) => arr.join(' '));
  const joinStrings = strings.join('\n');

  return `{\n${joinStrings}\n}`;
};

const doCompareFlat = (file1, file2) => {
  const fileParsed1 = analizePath(file1);
  const fileParsed2 = analizePath(file2);
  const comparedFiles = compareFilesFlat(fileParsed1, fileParsed2);
  return buildString(comparedFiles);
};

const compareStylish = (parsedFile1, parsedFile2) => {
  const mainObj = { ...parsedFile1, ...parsedFile2 };
  const sep = ' ';
  const iter = (value, depth) => {
    if (typeof value !== 'object' || value === null) {
      return `${value}`;
    }
    const keys = sortKeys(Object.keys(value));
    const replace = depth - 1 > 0 ? sep.repeat(depth - 2) : sep.repeat(2);
    const replaceBr = depth - 1 > 0 ? sep.repeat(depth - 4) : '';
    const result = keys
      .map((key) => {
        const newValue = iter(value[key], depth + 4);
        return [`${replace}${key}: ${newValue}`];
      })
      .join('\n');

    return `{\n${result}\n${replaceBr}}`;
  };

  return iter(mainObj, 0);
};

export { compareFilesFlat, sortKeys, buildString, compareStylish };
export default doCompareFlat;

// const val1 = parsedFile1[key];
// const val2 = parsedFile2[key];
// console.log(newValue)
// if (val1 === newValue && val2 !== newValue) {
//   return [`${replace}- ${key}: ${newValue}`];
// }
// if (val1 !== newValue && val2 === newValue) {
//   if (val1 !== undefined) {
//     return [`${replace}- ${key}: ${newValue}`];
//   }
//   return [`${replace}+ ${key}: ${newValue}`];
// }
// if (val1 === newValue && val2 === newValue) {
//   return [`${replace}  ${key}: ${val1}`];
// }
