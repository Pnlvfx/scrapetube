/* eslint-disable unicorn/prefer-top-level-await */
import { convertFromDirectory } from 'joi-to-typescript';

async function types(): Promise<void> {
  console.log('Running joi-to-typescript...');

  const result = await convertFromDirectory({
    schemaDirectory: './src/schemas',
    typeOutputDirectory: './src/interfaces',
    debug: true,
  });

  if (result) {
    console.log('Completed joi-to-typescript');
  } else {
    console.log('Failed to run joi-to-typescript');
  }
}

types();
