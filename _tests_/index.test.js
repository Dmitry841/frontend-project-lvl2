import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import { genDiff } from '../src/index.js';
import { getDataFromJson, getDataFromYaml } from '../src/parsers.js';
import expected from '../_fixtures_/expected.flat.js';
import expectedDeep from '../_fixtures_/expected.deep.js';
import expectedFlat from '../_fixtures_/expected.flat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);

test('genDiffJson', () => {
  const data1 = getDataFromJson(getFixturePath('file1.json'));
  const data2 = getDataFromJson(getFixturePath('file2.json'));
  expect(genDiff(data1, data2)).toEqual(expected());
});

test('genDiffYml', () => {
  const data1 = getDataFromYaml(getFixturePath('file1.yml'));
  const data2 = getDataFromYaml(getFixturePath('file2.yml'));
  expect(genDiff(data1, data2)).toEqual(expectedFlat());
});
