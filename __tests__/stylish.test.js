import analizePath from '../src/parser.js';
import doCompareFlat, {
  sortKeys,
  compareFilesFlat,
  buildString,
} from '../src/stylish.js';

const path1 = '__fixtures__/file1.json';
const file1 = analizePath(path1);
const path2 = '__fixtures__/file2.json';
const file2 = analizePath(path2);

test('sortData', () => {
  const actual1 = ['hexlet.io', 50, '123.234.53.22', false];
  expect(sortKeys(file1)).toStrictEqual(actual1);
});

test('compareFilesFlat', () => {
  const actual1 = [
    [' -', 'follow:', false],
    ['  ', 'host:', 'hexlet.io'],
    [' -', 'proxy:', '123.234.53.22'],
    [' -', 'timeout:', 50],
    [' +', 'timeout:', 20],
    [' +', 'verbose:', true],
  ];
  expect(compareFilesFlat(file1, file2)).toStrictEqual(actual1);
});

test('doCompareFlat', () => {
  const actual1 = compareFilesFlat(file1, file2);
  expect(doCompareFlat(path1, path2)).toStrictEqual(buildString(actual1));
});
