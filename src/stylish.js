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

export { compareFilesFlat, sortKeys, buildString };
export default doCompareFlat;
