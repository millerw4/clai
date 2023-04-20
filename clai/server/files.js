import { readdir, writeFile } from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ___dirname = path.dirname(__dirname);

// const testArr = ['line1\n', 'line2\n', 'line3\n', 'line4\n']
const writeObj = async function(fileName, output) {
  console.log('testing mapped array', output)
  return await writeFile(`./public/obj/${fileName}.obj`, output);
  // return await writeFile(`./public/obj/${fileName}.obj`, output);
}
const readObjFilenames = async function() {
  // return await readdir(path.join(__dirname, '/obj'));
  const contents = await readdir(path.join(___dirname, 'public', 'obj'));
  console.log('contents', contents)
  return contents;
}

export default {
  writeObj,
  readObjFilenames
  }