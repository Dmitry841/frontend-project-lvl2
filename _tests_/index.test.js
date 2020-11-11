import { dirname } from 'path';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { genDiff, getDataParse } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);

test('genDiff', () => {
  const data1 = getDataParse(getFixturePath('file1.json'));
  const data2 = getDataParse(getFixturePath('file2.json'));
  const expected1 =
  `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
  expect(genDiff(data1, data2)).toBe(expected1);
});
