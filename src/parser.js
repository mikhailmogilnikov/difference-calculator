import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';

const getFile = (filePath) => {
  try {
    return readFileSync(
      path.resolve(cwd(), filePath),
      'utf-8',
    );
  } catch (error) {
    console.error('Error get file:', error);
    return null;
  }
};

const parserJSON = (filePath) => {
  try {
    return JSON.parse(filePath);
  } catch (error) {
    // console.error('Error parsing JSON:', error);
    return null;
  }
};

const parserYAML = (filePath) => {
  try {
    return yaml.load(filePath);
  } catch (error) {
    // console.error('Error parsing YAML:', error);
    return null;
  }
};

const analizePath = (filePath) => {
  const pathParsed = getFile(filePath);
  if (filePath.endsWith('.json')) return parserJSON(pathParsed);
  if (filePath.endsWith('.yml')) return parserYAML(pathParsed);
  return null;
};

export { parserJSON, parserYAML, getFile };
export default analizePath;
