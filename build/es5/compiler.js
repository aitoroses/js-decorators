"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var AnnotationRegex = /^@([a-z-A-Z-1-9]*)(\((.+)?\))?/;
var functionReg = /^function\s(.+)(\((.+)?\))/;

var Compiler = (function () {
  function Compiler() {
    _classCallCheck(this, Compiler);
  }

  _createClass(Compiler, {
    compile: {
      value: function compile(content) {

        // Obtain the annotations and annotables
        var lines = content.split("\n");
        var replaced = [];

        // Replace annotations with decorators
        var annotating = false;
        var annotations = 0;
        for (var i = 0; i < lines.length; i++) {

          var line = lines[i];

          // Annotation
          var anns = AnnotationRegex.exec(line);
          if (anns) {
            annotations++;
            annotating = true;
            // Comment annotation
            lines[i] = "/*" + line + "*/";
            // Annotation data
            var name = anns[1];
            var args = anns[3];
            // Make the replacement
            line = "new " + name + ("(" + args + ",");
            replaced.push(line);
          } else {
            // Annotable
            if (annotating) {
              /*
                Finish the decorator chain if the next line it's
                a function of a class.
              */
              var annotable = /^(function|class)\s+(.+)\(?.+{/.exec(line);
              if (annotable) {
                var getMatches =

                // Find the last line of the body function and append the annotation
                function (string, regex, index) {
                  index || (index = 1); // default to the first capturing group
                  var matches = [];
                  var match;
                  while (match = regex.exec(string)) {
                    matches.push(match[index]);
                  }
                  return matches;
                };

                var previousLine = replaced[annotations - 1];
                // Get the name
                var name = annotable[2];

                // Finish the line
                previousLine += " " + name.replace(/\((.+)?\)/, "") + "" + Array(annotations + 1).join(")");
                replaced[annotations - 1] = previousLine;
                var braces = 0; /* the class bodys brace */
                for (var j = i; j < lines.length; j++) {
                  var line = lines[j];
                  braces += getMatches(line, /({)/g).length;
                  braces -= getMatches(line, /(})/g).length;
                  if (braces == 0) {
                    // Finish the body
                    line += " " + replaced.join(" ");
                    lines[j] = line;
                    j = lines.length;
                  }
                }

                // Restart annotation process
                annotating = false;
                annotations = 0;
              }
            }
          }
        }

        return lines.join("\n");
      }
    }
  });

  return Compiler;
})();

module.exports = Compiler;