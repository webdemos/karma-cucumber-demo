#!usr/bin/env node

// I don't want the actual return value to be the result of the call, so use exclamatory mark here, also save a byte
// http://stackoverflow.com/questions/3755606/what-does-the-exclamation-mark-do-before-the-function
!function () {
    var fs = require('fs'),
        path = require('path'),
        shell = require('shelljs');
    
    var stepFactories = 'step_factories/',
        tmp = '.tmp/',
        tmpSteps = path.resolve(__dirname + '/../' + tmp + './steps.js'),
        featuresDir = path.resolve(__dirname + '/../' + 'features/'),
        snippets = path.resolve(__dirname + '/../' + '.supports/javascript_syntax.js'),
        wrapper =  path.resolve(__dirname + '/../' + '.supports/wrapper.tpl.js'),
        tmpWrapper =  path.resolve(__dirname + '/../' + tmp + '.wrapper.js'),
        command = 'node ' + path.resolve('node_modules/cucumber/bin/cucumber.js'),
        snippetSyntax = '--snippet-syntax ' + snippets;
    
    function bufferFile (relPath) {
        return fs.readFileSync(path.join(relPath), {encoding: 'utf-8'});
    }

    function cleanSteps () {
        if (shell.test('-f', [tmpSteps])) {
            shell.rm('-rf', tmpSteps);
            shell.echo(tmpSteps + ' cleaned');
            // shell.echo(process.cwd());
        }
    }
    
    fs.readdir(featuresDir, function (err, files) {
      if (err) {
          console.error(err);
      }
  
      files.forEach(function (file) {
        fs.lstat(path.resolve(featuresDir + '/' + file), function (err, stats) {
          if (err) {
            console.error(err);
          }
          
          if (stats.isFile()) {
            var parsedPath = path.parse(file);
            if (parsedPath.ext === '.feature') {
              var featureName = parsedPath.name;
              var feature = path.resolve(featuresDir + '/' + featureName + '.feature');
  
              cleanSteps();
              shell.exec(command + ' ' + snippetSyntax + ' ' + feature);
  
              shell.cp(wrapper, tmpWrapper);
  
              // Buffer steps
              var BUFFER = bufferFile(tmpSteps);
  
              shell.sed('-i', "'%STEPS%';", BUFFER, tmpWrapper);
  
              shell.mv('-f', tmpWrapper, stepFactories + tmp + featureName + '.steps.js');
  
              cleanSteps();
            }
          }
        })
      });
    });
}();








