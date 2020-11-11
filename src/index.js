import fs from 'fs';

const getUnicItems = (data) => data.reduce((acc, item) => {
  if (!acc.includes(item)) {
    acc.push(item);
  }
  return acc;
}, []);

const getDataParse = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8'));

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = keys1.concat(keys2).sort();
  const commonKeys = getUnicItems(allKeys);
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
  const data1 = getDataParse(filepath1);
  const data2 = getDataParse(filepath2);
  return genDiff(data1, data2);
};

export { getUnicItems, getDataParse, genDiff };

export default showDiff;
