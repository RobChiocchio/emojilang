const escodegen = require("escodegen");
const babel = require("@babel/core");

var parser = require("./emojilang");

module.exports = {
    add(a,b) { return a+b }
}

// TODO: macro functions into emoji

var parse = exports.parse = function (source, verbose = false) { // Returns AST
    var ast = null; // Abstract syntax tree representation of source code

    try { // Parse source code to AST
        ast = parser.parse(source);
    } catch (exception) {
        console.log("Parse Error: " + exception.message); // TODO: what do I return if there is an error?
    }

    //ast = babel.transformFromAstSync(ast); // DEBUG:

    if (verbose) {
        console.log(ast); //TODO: find a better library for printing AST
    }
    
    return ast;
}

var generate = exports.generate = function (ast, verbose = false) {
    // TODO: validate AST (and throw error if invalid?)
    var code = escodegen.generate(ast); // Generate ECMAScript code from AST
    // TODO: other processing functions

    code = babel.transformSync(code, { code: true, ast: false, sourceMaps: false }).code; // Transform JSified code with Babel DEBUG

    if (verbose) {
        console.log(code);
    }

    return code
}

var exec = exports.exec = function (code, verbose = false) {
    // TODO: check for code (and throw error if invalid?)

    var timeStarted = process.hrtime.bigint();

    try { // Try to run the generated code
        eval(code); // Evaluage code from string
    } catch (exception) {
        console.log("Parse Error: " + exception.message); // TODO: what now?
    }

    var timeToExec = parseFloat(process.hrtime.bigint() - timeStarted); // Calculate time taken to execute

    if (verbose) {
        console.log("Executed emojilang script in: " + (timeToExec / 1000000).toFixed(3) + " ms"); // Logs time in ms to 3 decimal places
    }

    // TODO: add a return value (or a callback)
}

var run = exports.run = function (source, verbose = false) { // Parses, generates, and runs the code in one function
    exec(generate(parse(source, verbose), verbose), verbose); // Parses the emojillang script, generates JS, executes it, passing the verbose param to each func
    // TODO: add a return value (or a callback)
}

function test () { // Run if not called as a module
    var example = "🌳🌘✌👋🌎✌🌒🏁\n⚖️🌘✔️🌒🌜console🔬log🌘\"test\"🌒🏁🌛\n";
    run(example, true);
}

if (require.main === module) { // Check if run directly from Node
    test();
}