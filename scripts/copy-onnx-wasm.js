const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "node_modules", "onnxruntime-web", "dist");
const dstDir = path.join(__dirname, "..", "public", "onnx-wasm");

if (!fs.existsSync(dstDir)) {
  fs.mkdirSync(dstDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter((f) => f.endsWith(".wasm") || f.endsWith(".mjs"));

if (files.length === 0) {
  console.warn("No .wasm or .mjs files found in onnxruntime-web/dist");
  process.exit(0);
}

files.forEach((file) => {
  const src = path.join(srcDir, file);
  const dst = path.join(dstDir, file);
  fs.copyFileSync(src, dst);
  const sizeMB = (fs.statSync(dst).size / 1024 / 1024).toFixed(2);
  console.log(`Copied ${file} (${sizeMB} MB)`);
});

console.log(`ONNX WASM/JS copied: ${files.length} file(s)`);
