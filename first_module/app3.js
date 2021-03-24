import csvToJson from 'csvtojson';
import fs from 'fs';
import { pipeline } from 'stream';

const csvFilePath = './csv/source.csv';
const resultFilePath = './data.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(resultFilePath);

fs.appendFile(resultFilePath, '', function (err) {
  if (err) {
    console.error('Writing error.', err);
  }
});

pipeline(
  readStream,
  csvToJson({
    headers: ['book', 'author', 'amount', 'price'],
    colParser: {
      amount: 'omit',
      price: 'number',
    },
  }),
  writeStream,

  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);