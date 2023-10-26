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

test('compareJSON - flat', () => {
  const expected = `[{"name":"follow","status":"removed","value":false},{"name":"host","value":"hexlet.io"},{"name":"proxy","status":"removed","value":"123.234.53.22"},{"name":"timeout","status":"changed","valueBefore":50,"valueAfter":20},{"name":"verbose","status":"added","value":true}]`;
  expect(genDiff(path1, path2, 'json')).toBe(expected);
  expect(genDiff(pathFull1, path2, 'json')).toBe(expected);
  expect(genDiff(pathFull1, pathFull2, 'json')).toBe(expected);
});

test('compareJSON - nested', () => {
  const expected = `[{"name":"common","value":"[{"name":"follow","status":"added","value":false},{"name":"setting1","value":"Value 1"},{"name":"setting2","status":"removed","value":200},{"name":"setting3","status":"changed","valueBefore":true,"valueAfter":null},{"name":"setting4","status":"added","value":"blah blah"},{"name":"setting5","status":"added","value":"[{"name":"key5","value":"value5"}]"},{"name":"setting6","value":"[{"name":"doge","value":"[{"name":"wow","status":"changed","valueBefore":"","valueAfter":"so much"}]"},{"name":"key","value":"value"},{"name":"ops","status":"added","value":"vops"}]"}]"},{"name":"group1","value":"[{"name":"baz","status":"changed","valueBefore":"bas","valueAfter":"bars"},{"name":"foo","value":"bar"},{"name":"nest","status":"changed","valueBefore":"[{"name":"key","value":"value"}]","valueAfter":"str"}]"},{"name":"group2","status":"removed","value":"[{"name":"abc","value":12345},{"name":"deep","value":"[{"name":"id","value":45}]"}]"},{"name":"group3","status":"added","value":"[{"name":"deep","value":"[{"name":"id","value":"[{"name":"number","value":45}]"}]"},{"name":"fee","value":100500}]"}]`;
  expect(genDiff(path3, path4, 'json')).toBe(expected);
  expect(genDiff(pathFull3, path4, 'json')).toBe(expected);
  expect(genDiff(pathFull3, pathFull4, 'json')).toBe(expected);
});
