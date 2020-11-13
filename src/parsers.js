import fs from 'fs';
import yaml from 'js-yaml';

const getDataFromJson = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8'));

const getDataFromYaml = (filepath) => yaml.safeLoad(fs.readFileSync(filepath, 'utf-8'));

export { getDataFromJson, getDataFromYaml };
