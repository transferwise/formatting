const fs = require('fs');
const glob = require('glob'); // eslint-disable-line  import/no-extraneous-dependencies
const path = require('path');

function extractLocale(filePath) {
  const fileName = path.basename(filePath, '.json');
  return fileName.substring(fileName.indexOf('.') + 1, fileName.length);
}

function buildTranslations(inputPattern, outputFile) {
  const translationFiles = glob.sync(inputPattern);

  const combined = translationFiles
    // eslint-disable-next-line global-require, import/no-dynamic-require
    .map(filePath => ({ [extractLocale(filePath)]: require(filePath) }))
    .reduce((a, b) => Object.assign(a, b), {});

  fs.writeFileSync(outputFile, JSON.stringify(combined, null, 4), 'utf8');
}

const root = path.resolve(__dirname, '../');
const translationFiles = path.resolve(root, 'messages.*.json');
const outputFileName = path.resolve(root, 'translations.json');
buildTranslations(translationFiles, outputFileName);
