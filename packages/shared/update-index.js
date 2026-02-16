import { existsSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";

const srcDir = join(__dirname, "src");
const indexFile = join(srcDir, "index.ts");

const directories = ["components", "utils", "hooks", "assets/icons"];

let content = "";

directories.forEach((dir) => {
  const dirPath = join(srcDir, dir);
  if (existsSync(dirPath)) {
    const files = readdirSync(dirPath);
    files.forEach((file) => {
      if (
        (file.endsWith(".tsx") || file.endsWith(".ts")) &&
        file !== "index.ts"
      ) {
        const name = file.replace(/\.(tsx|ts)$/, "");

        content += `export { default as ${name} } from "./${dir}/${name}";\n`;
      }
    });
  }
});

writeFileSync(indexFile, content);
console.log("✅ [Default 포함] src/index.ts 업데이트 완료!");
