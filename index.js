var parser = require("./emojilang");

var source="console🧒log🌘\"👋🌎\"🌒🏁";
var ast;

try {
    ast = parser.parse(source);
    console.log(ast);
} catch (exception) {
    console.log("Parse Error: " + exception.message);
}