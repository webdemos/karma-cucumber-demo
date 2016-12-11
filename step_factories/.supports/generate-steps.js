var fs = require('fs'),
  path = require('path'),
  tmp = __dirname + '/../.tmp/',
  steps = 'steps.js';

function bufferFile(relPath) {
  return fs.readFileSync(path.join(relPath), {encoding: 'utf-8'});
}

function generateSteps(/*pattern in RegExp*/ pattern, /*snippet in string*/ snippet) {
  try {
    // Query the entry
    var stats = fs.lstatSync(tmp + steps);
    var stepData = bufferFile(tmp + steps);

    if (stepData.indexOf(pattern) === -1) {
      fs.appendFileSync(tmp + steps, '\n' + snippet + '\n');
    }

  } catch (err) {
    console.info(err);
    fs.mkdir(tmp);
    fs.appendFileSync(tmp + steps, '\n' + snippet + '\n');
  }
}

module.exports = generateSteps;