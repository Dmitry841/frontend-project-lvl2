import path from 'path';
import _ from 'lodash';
import { getDataFromJson, getDataFromYaml } from '../src/parsers.js';

const toString = (obj) => {
  if (typeof obj !== 'object') {
    return obj;
  }
  const data = Object.entries(obj);
  const arrOfStrings = data.map(([key, val]) => {
    if (typeof val !== 'object') {
      return `\n\t${key}: ${val}`;
    } return `\n\t${key}: {\t${toString(val)}\n\t}`;
  });
  return arrOfStrings;
};

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const commonKeys = _.union(keys1.concat(keys2).sort());
  const difference = commonKeys.map((key) => {
    if (!keys2.includes(key)) {
      return typeof data1[key] !== 'object' ? `- ${key}: ${data1[key]}`
        : `- ${key}: ${toString(data1[key])}`;
    } if (keys1.includes(key) && keys2.includes(key)) {
      const valTostring1 = JSON.stringify(data1[key]);
      const valToString2 = JSON.stringify(data2[key]);
      if (valTostring1 === valToString2) {
        return `  ${key}: ${toString(data1[key])}`;
      } return [`- ${key}: ${toString(data1[key])}`, `+ ${key}: ${toString(data2[key])}`]
    } return typeof data2[key] !== 'object' ? `+ ${key}: ${data2[key]}` : `+ ${key}: ${toString(data2[key])}`;
  })
    .flat()
    .map((item) => `\n${item}`)
    .join('');
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
