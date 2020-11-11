import fs from 'fs';

const getData = (filepath11, filepath22) => {
  const data1 = fs.readFileSync(filepath11);
  const data2 = fs.readFileSync(filepath22);
  return [JSON.parse(data1), JSON.parse(data2)];
};

export default getData;
