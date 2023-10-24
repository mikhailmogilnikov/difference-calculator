import analizePath from '../parser.js';
import comparePlain from './plain.js';
import compareStylish from './stylish.js';

const genDiff = (first, second, format = 'stylish') => {
  const fileParsed1 = analizePath(first);
  const fileParsed2 = analizePath(second);
  switch (format) {
    case 'stylish':
      return compareStylish(fileParsed1, fileParsed2);
    case 'plain':
      return comparePlain(fileParsed1, fileParsed2);
    default:
      return 'Format not found';
  }
};

const logDiff = (first, second, options) => {
  console.log(genDiff(first, second, options.format));
};

export { logDiff };
export default genDiff;
