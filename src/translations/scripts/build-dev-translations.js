const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../');

const bundles = [
  {
    input: path.resolve(root, 'messages.json'),
    output: path.resolve(root, 'translations.json'),
  },
];

function buildDevTranslations(inputFile, outputFile) {
  try {
    const input = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    const output = {
      en: input,
    };
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 4), 'utf8');
  } catch (e) {
    console.error(`Could not build translation bundle for ${inputFile}`);
    throw e;
  }
}

bundles.forEach(({ input, output }) => buildDevTranslations(input, output));
