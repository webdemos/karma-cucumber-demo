var fs        = require('fs');
var temp = __dirname + '/../.temp/';
var steps = 'steps.js';
function JavaScriptSyntax() {
  return {
    build: function build (functionName, pattern, parameters, comment) {
      var callbackName = parameters[parameters.length - 1];
      var snippet =
        'scenario.' + functionName + '(' + pattern + ', function (' + parameters.join(', ') + ') {' + '\n' +
        '  // ' + comment + '\n' +
        '  ' + callbackName + '();\n' +
        '});';
		
		fs.mkdir(temp);
		fs.appendFileSync(temp + steps, '\n' + snippet + '\n');
		
      return snippet;
    }
  };
}

module.exports = JavaScriptSyntax;