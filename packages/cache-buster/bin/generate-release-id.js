#!/usr/bin/env node

const crypto = require('crypto');
const { writeFile } = require('fs/promises');
const path = require('path');

const FILENAME = 'RELEASE'


const generateReleaseId = async () => {
  const args = process.argv.slice(2)
  const publicDirIndex = args.findIndex(arg => arg.startsWith('--publicDir='));

  if (publicDirIndex === -1) {
    throw new Error('Public directory path not provided. Please add --publicDir=<public_directory_path> to the script.');
  }

  const publicDir = args[publicDirIndex].split('=')[1];

  try {
    const uuid = crypto.randomUUID()
    const filePath = path.join(process.cwd(), publicDir, FILENAME)
    await writeFile(filePath, uuid, 'utf-8');
    console.log(`${FILENAME} file has been saved with uuid ${uuid}`);
  } catch (err) {
    console.error(`An error occurred while writing ${FILENAME} file to public directory`);
    console.error(err);
  }
}

generateReleaseId()
