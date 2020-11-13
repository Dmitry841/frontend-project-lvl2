import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDataFromJson, getDataFromYaml } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);

test('getDataYaml', () => {
  const expected =
  {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(getDataFromYaml(getFixturePath('file1.yml'))).toEqual(expected);
  expect(getDataFromJson(getFixturePath('file1.json'))).toEqual(expected);
});
