const AnnotationRegex = /^@([a-z-A-Z-1-9]*)(\((.+)?\))?/;
const functionReg = /^function\s(.+)(\((.+)?\))/

class Lexer {
  lex(content) {

    // Obtain the annotations and annotables
    var lines = content.split('\n');
    var replaced = [];

    // Replace annotations with decorators
    var annotating = false;
    var annotations = 0;
    for (var i=0; i<lines.length; i++) {

      var line = lines[i];

      // Annotation
      var anns = AnnotationRegex.exec(line);
      if (anns) {
        annotations++;
        annotating = true;
        // Annotation data
        var name = anns[1];
        var args = anns[3];
        // Make the replacement
        line = name + `(${args},`;
      } else {
        // Annotable
        if (annotating) {
          /*
            Finish the decorator chain if the next line it's
            a function of a class.
          */
          var annotable = /^(function|class)\s+(.+)\(?.+{/.exec(line)
          if (annotable) {
            var previousLine = replaced[i-1];
            // Get the name
            var name = annotable[2];
            // Finish the line
            previousLine += ` ${name.replace(/\((.+)?\)/,'')}${Array(annotations+1).join(')')}`;
            replaced[i-1] = previousLine
            annotating = false;
            annotations = 0;
          }
        }
      }
      replaced[i] = line;
    }

    return replaced.join('\n');
  }
}

export {Lexer}
