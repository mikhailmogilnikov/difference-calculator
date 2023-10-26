import analizePath from '../src/parser.js';
import { test, expect } from '@jest/globals';

const path1 = '__fixtures__/flat/file1.json';
const path2 = '__fixtures__/flat/file2.json';
const path3 = '';
const path4 = '__fixtures__/flat/file1.yml';

test('parser', () => {
  const actual1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(analizePath(path1)).toStrictEqual(actual1);
  const actual2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  expect(analizePath(path2)).toStrictEqual(actual2);
  expect(analizePath(path3)).toBe(null);
});

test('yml parcer', () => {
  const actual1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(analizePath(path4)).toStrictEqual(actual1);
});
