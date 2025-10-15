import { nodeConfigs } from '@goatjs/node-eslint';
import { defineConfig, globalIgnores } from '@eslint/config-helpers';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default defineConfig(globalIgnores(['dist', '.yarn']), ...nodeConfigs({ tsconfigRootDir: import.meta.dirname }));
