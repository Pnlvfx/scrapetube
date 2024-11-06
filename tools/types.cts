/* eslint-disable unicorn/prefer-top-level-await */
import { convertFromDirectory } from 'joi-to-typescript';

async function types(): Promise<void> {
  await convertFromDirectory({
    schemaDirectory: './src/schemas',
    typeOutputDirectory: './src/interfaces',
    debug: true,
    omitIndexFiles: true,
  });
}

void types();
