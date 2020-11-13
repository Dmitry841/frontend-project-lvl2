import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { getDataFromJson, getDataFromYaml } from './parsers.js';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = _.union(keys1.concat(keys2).sort());
  const difference = commonKeys.map((key) => {
    if (!keys2.includes(key)) {
      return `- ${key}: ${data1[key]}`;
    } if (keys1.includes(key) && keys2.includes(key)) {
      return data2[key] === data1[key] ? `  ${key}: ${data1[key]}`
        : [`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`];
    } return `+ ${key}: ${data2[key]}`;
  })
    .flat()
    .map((item) => `\n${item}`)
    .join('');
  console.log(`{${difference}\n}`);
  return `{${difference}\n}`;
};

const showDiff = (filepath1, filepath2) => {
  const data1 = path.extname(filepath1) === '.json'
    ? getDataFromJson(filepath1) : getDataFromYaml(filepath1);
  const data2 = path.extname(filepath2) === '.yml'
    ? getDataFromYaml(filepath2) : getDataFromJson(filepath2);
  return genDiff(data1, data2);
};

export { genDiff };

export default showDiff;
