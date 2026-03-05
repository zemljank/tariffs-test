import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const inputFile = path.resolve(cwd, "styles.scss");
const outputFile = path.resolve(cwd, "styles.css");

function resolveImportPath(currentFile, importPath) {
  const basePath = importPath.endsWith(".scss") ? importPath : `${importPath}.scss`;
  return path.resolve(path.dirname(currentFile), basePath);
}

function bundleScss(filePath, trace = []) {
  if (trace.includes(filePath)) {
    throw new Error(`Circular SCSS import detected: ${[...trace, filePath].join(" -> ")}`);
  }

  const source = fs.readFileSync(filePath, "utf8");
  const lines = source.split(/\r?\n/);
  const output = [];

  for (const line of lines) {
    const match = line.match(/^\s*@import\s+["'](.+?)["'];\s*$/);

    if (!match) {
      output.push(line);
      continue;
    }

    const importedFile = resolveImportPath(filePath, match[1]);

    if (!fs.existsSync(importedFile)) {
      throw new Error(`SCSS import not found: ${match[1]} (resolved to ${importedFile})`);
    }

    const relativePath = path.relative(cwd, importedFile);
    output.push(`/* >>> ${relativePath} */`);
    output.push(bundleScss(importedFile, [...trace, filePath]));
    output.push(`/* <<< ${relativePath} */`);
  }

  return output.join("\n").trimEnd();
}

function build() {
  const bundled = `${bundleScss(inputFile)}\n`;
  fs.writeFileSync(outputFile, bundled, "utf8");
  console.log(`Built ${path.relative(cwd, outputFile)} from ${path.relative(cwd, inputFile)}`);
}

build();
