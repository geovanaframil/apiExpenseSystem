import fs from 'fs';

function readData(database:string) {
    const filePath = `./database/${database}.json`;
    const file = fs.readFileSync(filePath, 'utf-8');
    const fileJson = JSON.parse(file);
    return fileJson;
}

export default readData;