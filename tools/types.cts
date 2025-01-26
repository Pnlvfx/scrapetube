/* eslint-disable sonarjs/slow-regex */
import { convertFromDirectory } from 'joi-to-typescript';
import fs from 'node:fs/promises';
import path from 'node:path';
import prettier from 'prettier';

const patchImports = async (dir: string) => {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      await patchImports(fullPath);
    } else {
      const buf = await fs.readFile(fullPath, 'utf8');
      const updatedContent = buf.toString().replaceAll(/import\s+([^"']+["'])([^"']+)(["'])/g, (match, p1, p2, p3) => {
        if (typeof p1 === 'string' && typeof p2 === 'string' && typeof p3 === 'string' && !p2.endsWith('.js')) {
          return `import ${p1}${p2}.js${p3}`;
        }
        return match;
      });
      const prettierConfig = await prettier.resolveConfig(fullPath);
      await fs.writeFile(fullPath, await prettier.format(updatedContent, { ...prettierConfig, parser: 'typescript' }));
    }
  }
};

const types = async () => {
  const typesDir = './src/interfaces';
  await convertFromDirectory({
    schemaDirectory: './src/schemas',
    typeOutputDirectory: typesDir,
    debug: true,
    omitIndexFiles: true,
  });
  await patchImports(typesDir);
};

void types();
