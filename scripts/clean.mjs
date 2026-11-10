// @ts-check

import { rimraf } from 'rimraf';
import enquirer from 'enquirer';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const { prompt } = enquirer;

const patterns = ['./packages/*/dist', '**/vite.config.*.timestamp*'];

const nodeModules = ['./packages/*/node_modules'];

const defaultValues = {
  deleteNodeModules: false,
};

async function main() {
  try {
    const argv = yargs(hideBin(process.argv))
      .option('yes', {
        alias: 'y',
        type: 'boolean',
        description: 'Run script with default values without prompting',
        default: false,
      })
      .help(true)
      .version(false)
      .parseSync();

    let $patterns = [...patterns];
    let deleteNodeModules;
    if (argv.yes) {
      deleteNodeModules = true;
    } else {
      /** @type {{deleteNodeModules: boolean }} */
      const response = await prompt([
        {
          type: 'confirm',
          name: 'deleteNodeModules',
          message: 'Do you want to delete packages and apps `node_modules` directories?',
          initial: defaultValues.deleteNodeModules,
        },
      ]);
      deleteNodeModules = response.deleteNodeModules;
    }
    if (deleteNodeModules) {
      $patterns = $patterns.concat(nodeModules);
    }
    await rimraf($patterns, { glob: true });
    process.exit(0);
  } catch (err) {
    console.error('Clean failed:', err);
    process.exit(1);
  }
}

main();
