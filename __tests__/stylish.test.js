import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path1 = '__fixtures__/flat/file1.json';
const pathFull1 = path.join(__dirname, `../${path1}`);

const path2 = '__fixtures__/flat/file2.json';
const pathFull2 = path.join(__dirname, `../${path2}`);

const path3 = '__fixtures__/nested/file3.json';
const pathFull3 = path.join(__dirname, `../${path3}`);

const path4 = '__fixtures__/nested/file4.yaml';
const pathFull4 = path.join(__dirname, `../${path4}`);

test('Unknown Formatter', () => {
  expect(genDiff(path1, path2, 'format')).toBe('Format not found');
})

test('compareFiles - flat', () => {
  const actual1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(path1, path2)).toBe(actual1);
  expect(genDiff(pathFull1, path2)).toBe(actual1);
  expect(genDiff(pathFull1, pathFull2)).toBe(actual1);
});

test('compareFiles - nested', () => {
  const actual1 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(genDiff(path3, path4)).toBe(actual1);
  expect(genDiff(pathFull3, path4)).toBe(actual1);
  expect(genDiff(pathFull3, pathFull4)).toBe(actual1);
});
