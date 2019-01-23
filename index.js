const escodegen = require("escodegen");
var parser = require("./emojilang");

// TODO: macro functions into emoji

var example="console🔬log🌘✌👋🌎✌🌒🏁\n⚖️🌘✔️🌒🌜console🔬log🌘\"test\"🌒🏁🌛\n"; // temp

function parse (source) { // Returns AST
    var ast = null; // Abstract syntax tree representation of source code

    try { // Parse source code to AST
        ast = parser.parse(source);
        console.log(ast);
    } catch (exception) {
        console.log("Parse Error: " + exception.message); // TODO: what do I return if there is an error?
    }
    
    return ast;
}

function exec (ast) {
    var code = escodegen.generate(ast); // Generate ECMAScript code from AST
    console.log(code);
    
    try { // Try to run the generated code
        eval(code); // Evaluage code from string
    } catch (exception) {
        console.log("Parse Error: " + exception.message); // TODO: what now?
    }
}

exec(parse(example));