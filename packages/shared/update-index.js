import { existsSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = join(__dirname, 'src');
const mainIndexFile = join(srcDir, 'index.ts');
const directories = ['utils', 'assets/icons', 'components', 'hooks'];

let mainIndexContent = '';

directories.forEach((dir) => {
  const dirPath = join(srcDir, dir);
  if (!existsSync(dirPath)) return;

  const files = readdirSync(dirPath).filter(
    (file) => (file.endsWith('.tsx') || file.endsWith('.ts')) && file !== 'index.ts',
  );

  if (dir === 'assets/icons') {
    // 1. 아이콘은 내부 index.ts를 만들고 메인에선 한 줄로 처리
    const iconIndexContent = files
      .map(
        (file) =>
          `export { default as ${file.replace(/\.(tsx|ts)$/, '')} } from "./${file.replace(/\.(tsx|ts)$/, '')}";`,
      )
      .join('\n');
    writeFileSync(join(dirPath, 'index.ts'), iconIndexContent);
    mainIndexContent += `export * from "./${dir}";\n`;
  } else if (dir === 'utils') {
    // 2. utils는 내부 index 없이 메인에서 파일별로 export * 처리 (고정 요청 사항)
    files.forEach((file) => {
      const name = file.replace(/\.(tsx|ts)$/, '');
      mainIndexContent += `export * from "./${dir}/${name}";\n`;
    });
  } else {
    // 3. 나머지는 기존 방식 (export { default as ... })
    files.forEach((file) => {
      const name = file.replace(/\.(tsx|ts)$/, '');
      mainIndexContent += `export { default as ${name} } from "./${dir}/${name}";\n`;
    });
  }
});

writeFileSync(mainIndexFile, mainIndexContent);
console.log('✅ src/index.ts 업데이트 완료!');
