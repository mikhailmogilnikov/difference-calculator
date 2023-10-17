/* eslint-disable no-undef */
import { cwd } from 'node:process';
import analizePath, { getFile } from '../src/parser.js';

console.log(`Current directory: ${cwd()}`);

test('getFile', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '/Users/mikhail/Documents/dev/projects/hex-test/frontend-project-46/__fixtures__/file1.json';
  expect(getFile(path1)).toBe(getFile(path2));
  expect(getFile(path2)).toBe(getFile(path2));
});

test('parser', () => {
  const path1 = '__fixtures__/file1.json';
  const actual1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(analizePath(path1)).toStrictEqual(actual1);
  const path2 = '/Users/mikhail/Documents/dev/projects/hex-test/frontend-project-46/__fixtures__/file2.json';
  const actual2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  expect(analizePath(path2)).toStrictEqual(actual2);
  const path3 = '';
  expect(analizePath(path3)).toBe(null);
});
