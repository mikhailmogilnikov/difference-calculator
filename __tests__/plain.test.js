import path from 'node:path';
import genDiff from '../index.js';

const path1 = '__fixtures__/flat/file1.json';
const pathFull1 = path.join(__dirname, `../${path1}`);

const path2 = '__fixtures__/flat/file2.json';
const pathFull2 = path.join(__dirname, `../${path2}`);

const path3 = '__fixtures__/nested/file3.json';
const pathFull3 = path.join(__dirname, `../${path3}`);

const path4 = '__fixtures__/nested/file4.yaml';
const pathFull4 = path.join(__dirname, `../${path4}`);

test('comparePlain - flat', () => {
  const expected = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;

  expect(genDiff(path1, path2, 'plain')).toBe(expected);
  expect(genDiff(pathFull1, path2, 'plain')).toBe(expected);
  expect(genDiff(pathFull1, pathFull2, 'plain')).toBe(expected);
});

test('comparePlain - nested', () => {
  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(genDiff(path3, path4, 'plain')).toBe(expected);
  expect(genDiff(pathFull3, path4, 'plain')).toBe(expected);
  expect(genDiff(pathFull3, pathFull4, 'plain')).toBe(expected);
});
