import path from 'node:path';
import analizePath from '../src/parser.js';
import doCompareFlat, {
  sortKeys,
  compareFilesFlat,
  buildString,
} from '../src/stylish.js';

const path1 = '__fixtures__/file1.json';
const pathFull1 = path.join(__dirname, `../${path1}`);
const file1 = analizePath(path1);
const fileFull1 = analizePath(pathFull1);

const path2 = '__fixtures__/file2.json';
const pathFull2 = path.join(__dirname, `../${path2}`);
const file2 = analizePath(path2);
const fileFull2 = analizePath(pathFull2);

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
  expect(compareFilesFlat(fileFull1, file2)).toStrictEqual(actual1);
  expect(compareFilesFlat(fileFull1, fileFull2)).toStrictEqual(actual1);
});

test('doCompareFlat', () => {
  const actual1 = compareFilesFlat(file1, file2);
  expect(doCompareFlat(path1, path2)).toStrictEqual(buildString(actual1));
});
