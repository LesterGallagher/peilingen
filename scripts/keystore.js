
const fs = require('fs');
const { exec } = require('child_process');
const packageJson = require('../package.json');
const path = require('path');
const readlineSync = require('readline-sync');

const settings = {};
fs.readFileSync(path.join(__dirname, '../platforms/android/release-signing.properties')).toString()
  .split('\n')
  .map(line => line.split('='))
  .map(tuple => settings[tuple[0]] = tuple[1]);

if (!fs.existsSync(path.join(__dirname, '../platforms/android/app.keystore'))) {
  const childProcess = exec(` keytool -genkey -v -keystore platforms/android/${settings.storeFile} -alias ${settings.keyAlias} -keyalg RSA -keysize 2048 -validity 10000` , (err, stdout, stderr) => {
    if (err) {
      console.error('unable to create app.keystore: ' + err);
      return;
    }
  });

  var authorName = readlineSync.question('Author name? ');
  var organization = readlineSync.question('Organization? ');
  var city = readlineSync.question('City? ');
  var province = readlineSync.question('Province? ');
  var countryCode = readlineSync.question('Country code? ');

  childProcess.stdin.write(`${settings.storePassword}\n`); // Enter keystore password:
  childProcess.stdin.write(`${settings.storePassword}\n`); // Re-enter new password:
  childProcess.stdin.write(`${authorName}\n`); // What is your first and last name?
  childProcess.stdin.write('\n'); // What is the name of your organizational unit?
  childProcess.stdin.write(`${organization}\n`); // What is the name of your organization?
  childProcess.stdin.write(`${city}\n`); // What is the name of your City or Locality?
  childProcess.stdin.write(`${province}\n`); // What is the name of your State or Province?
  childProcess.stdin.write(`${countryCode}\n`); // What is the two-letter country code for this unit?
  childProcess.stdin.write('yes\n'); // Is correct?
  childProcess.stdin.write(`${settings.keyPassword}\n`); // Enter key password
  childProcess.stdin.end();
}


