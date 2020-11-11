import getData from './dirtyfunctions.js';

const genDiff = (filepath1, filepath2) => {
  const [file1, file2] = getData(filepath1, filepath2);
  const keys1 = Object.keys(file1).sort();
  const keys2 = Object.keys(file2).sort();
  const commonKeys = keys1.concat(keys2).sort();
  const unicKeys = commonKeys.reduce((acc, key) => {
    if (!acc.includes(key)) {
      acc.push(key);
    }
    return acc;
  }, []);
  const difference = unicKeys.map((key) => {
    if (!keys2.includes(key)) {
      return `- ${key}: ${file1[key]}`;
    } if (keys1.includes(key) && keys2.includes(key)) {
      return file2[key] === file1[key] ? `  ${key}: ${file1[key]}`
        : [`- ${key}: ${file1[key]}`, `+ ${key}: ${file2[key]}`];
    } if (!keys1.includes(key)) {
      return `+ ${key}: ${file2[key]}`;
    }
  })
    .flat()
    .map((item) => `\n${item}`)
    .join('');
  console.log(`{${difference}\n}`);
  return `{${difference}\n}`;
};
export default genDiff;
