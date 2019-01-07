const fs = require("fs-extra");
const path = require("path");
const { transform, parseSync } = require("@babel/core");
const traverse = require("@babel/traverse").default;

const entry = "sketch.js";
const templatePath = path.join(__dirname, "template");
const outputPath = "sandbox";

fs.copySync(templatePath, outputPath);
fs.copy("package.json", path.join(outputPath, "package.json"));

const files = [entry];

while (files.length > 0) {
  const file = files.pop();
  const filePath = path.dirname(file);
  const code = fs.readFileSync(file, "utf8");
  const ast = parseSync(code, {
    sourceType: "module"
  });
  /* find all relative imports, we need to copy those */
  /* TODO: can we transform here as well? */
  traverse(ast, {
    ImportDeclaration(branch) {
      let module = branch.node.source.value;
      if (isRelativeModule(module)) {
        module = path.join(filePath, module);
        if (!module.endsWith(".js")) {
          module += ".js";
        }
        files.push(module);
      }
    }
  });
  /* we need to "flatten" all relative imports, e.g. "../../shapes" => "./shapes" */
  transform(code, { plugins: [rewriteRelativeImport] }, (_, result) => {
    fs.writeFile(path.join(outputPath, path.basename(file)), result.code);
  });
}

function isRelativeModule(name) {
  return name.startsWith(".");
}

function rewriteRelativeImport() {
  return {
    visitor: {
      ImportDeclaration(path) {
        const module = path.node.source.value;
        if (isRelativeModule(module)) {
          path.node.source.value = module.replace(/(..\/)+/, "./");
        }
      }
    }
  };
}
