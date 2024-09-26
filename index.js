import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([{
    type: 'input',
    message: 'Please Enter URL which you want to convert as QR Code',
    name: 'url',
  }])
  .then((answers) => {
    const ans = answers.url;

    var qr_code = qr.image(ans, { type: 'png' });
    var output = qr_code.pipe(fs.createWriteStream('qr_code.png'));

    output.on('finish', () => {
        console.log('QR Code saved successfully as qr_code.png');
    });
      output.on('error', (err) => {
        console.error('An error occurred while saving the file:', err);
    });


  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('Prompt could not be rendered in the current environment.');
    } else {
      console.log('An error occurred:', error);
    }
  });