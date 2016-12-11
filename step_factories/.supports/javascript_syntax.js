var generateSteps = require('../.supports/generate-steps');

function JavaScriptSyntax() {
    return {
        build: function build(functionName, pattern, parameters, comment) {
            var callbackName = parameters[parameters.length - 1];
            var snippet =
                'scenario.' + functionName + '(' + pattern + ', function (' + parameters.join(', ') + ') {' + '\n' +
                '  // ' + comment + '\n' +
                '  ' + callbackName + '();\n' +
                '});';
    
            generateSteps(pattern, snippet);

            return snippet;
        }
    };
}

module.exports = JavaScriptSyntax;