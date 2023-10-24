import path from 'node:path';
import analizePath from '../src/parser.js';
import doCompareStylish, { sortKeys, compareStylish } from '../src/stylish.js';

const path1 = '__fixtures__/flat/file1.json';
const pathFull1 = path.join(__dirname, `../${path1}`);
const file1 = analizePath(path1);
const fileFull1 = analizePath(pathFull1);

const path2 = '__fixtures__/flat/file2.json';
const pathFull2 = path.join(__dirname, `../${path2}`);
const file2 = analizePath(path2);
const fileFull2 = analizePath(pathFull2);

const path3 = '__fixtures__/nested/file3.json';
const pathFull3 = path.join(__dirname, `../${path3}`);

const path4 = '__fixtures__/nested/file4.yaml';
const pathFull4 = path.join(__dirname, `../${path4}`);

test('sortData', () => {
  const actual1 = ['hexlet.io', 50, '123.234.53.22', false];
  expect(sortKeys(file1)).toStrictEqual(actual1);
  expect(sortKeys(file2)).not.toStrictEqual(actual1);
  expect(sortKeys(fileFull1)).toStrictEqual(actual1);
  expect(sortKeys(fileFull2)).not.toStrictEqual(actual1);
});

test('compareFilesFlat', () => {
  const actual1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(doCompareStylish(path1, path2)).toBe(actual1);
  expect(doCompareStylish(pathFull1, path2)).toBe(actual1);
  expect(doCompareStylish(pathFull1, pathFull2)).toBe(actual1);
});

test('compareStylish', () => {
  const obj1 = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
    },
    group1: {
      baz: 'bas',
    },
  };

  const obj2 = {
    common: {
      setting1: 'Value 1',
      setting3: true,
    },
    group1: {
      baz: 'bars',
    },
  };

  const expected = `{
    common: {
         setting1: Value 1
      - setting2: 200
      + setting3: true
    }
    group1: {
      - baz: bas
      + baz: bars
    }
}`;
  expect(compareStylish(obj1, obj2)).not.toBe(expected);
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
  expect(doCompareStylish(path3, path4)).toBe(actual1);
  expect(doCompareStylish(pathFull3, path4)).toBe(actual1);
  expect(doCompareStylish(pathFull3, pathFull4)).toBe(actual1);
});
