import fs from 'fs';

async function readData(database: string) {
  const filePath = `./database/${database}.json`;
  const file = await fs.promises.readFile(filePath, 'utf-8');
  const fileJson = JSON.parse(file);
  return fileJson;
}

export default readData;