import { readdir, writeFile } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const writeObj = async function(fileName, output) {
  return await writeFile(`./public/obj/${fileName}.obj`, output);
}
const readObjFilenames = async function() {
  return await readdir(path.join(__dirname, '/obj'));
}

export default {
  writeObj,
  readObjFilenames
}