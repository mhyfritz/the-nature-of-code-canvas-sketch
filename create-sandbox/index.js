const fs = require("fs-extra");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const entry = "sketch.js";
const templatePath = path.join(__dirname, "template");
const outputPath = "sandbox";

fs.copySync(templatePath, outputPath);
fs.copy("package.json", path.join(outputPath, "package.json"));

const files = [entry];

while (files.length > 0) {
  const file = files.pop();
  fs.copy(file, path.join(outputPath, path.basename(file)));
  const filePath = path.dirname(file);
  const code = fs.readFileSync(file, "utf8");
  const ast = parser.parse(code, {
    allowImportExportEverywhere: true,
    sourceType: "module"
  });
  traverse(ast, {
    enter(branch) {
      if (branch.node.type === "ImportDeclaration") {
        let module = branch.node.source.value;
        if (isRelativeModule(module)) {
          module = path.join(filePath, module);
          if (!module.endsWith(".js")) {
            module += ".js";
          }
          files.push(module);
        }
      }
    }
  });
}

function isRelativeModule(name) {
  return name.startsWith(".");
}
