import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';

const getFile = (filePath) => {
  try {
    return readFileSync(path.resolve(cwd(), filePath), 'utf-8');
  } catch (error) {
    // console.error('Error get file:', error);
    return null;
  }
};

const parserJSON = (filePath) => JSON.parse(filePath);

const parserYAML = (filePath) => yaml.load(filePath);

const analizePath = (filePath) => {
  const pathParsed = getFile(filePath);
  if (filePath.endsWith('.json')) return parserJSON(pathParsed);
  if (filePath.endsWith('.yml') || filePath.endsWith('.yaml'))
    return parserYAML(pathParsed);
  return null;
};

export { getFile, parserJSON, parserYAML };
export default analizePath;
