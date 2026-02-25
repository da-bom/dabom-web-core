import { existsSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = join(__dirname, 'src');
const mainIndexFile = join(srcDir, 'index.ts');

const directories = ['utils', 'components', 'hooks'];

let mainIndexContent = '';

directories.forEach((dir) => {
  const dirPath = join(srcDir, dir);
  if (!existsSync(dirPath)) return;

  const files = readdirSync(dirPath).filter(
    (file) => (file.endsWith('.tsx') || file.endsWith('.ts')) && file !== 'index.ts',
  );

  if (dir === 'utils') {
    // 1. utils는 내부 index 없이 메인에서 파일별로 export * 처리
    files.forEach((file) => {
      const name = file.replace(/\.(tsx|ts)$/, '');
      mainIndexContent += `export * from "./${dir}/${name}";\n`;
    });
  } else {
    // 2. 나머지는 기본 방식 (export { default as ... })
    files.forEach((file) => {
      const name = file.replace(/\.(tsx|ts)$/, '');
      mainIndexContent += `export { default as ${name} } from "./${dir}/${name}";\n`;
    });
  }
});

writeFileSync(mainIndexFile, mainIndexContent.trim() + '\n');
console.log('✅ src/index.ts 업데이트 완료!');
