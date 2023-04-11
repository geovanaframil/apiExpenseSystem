import fs from 'fs';

function saveDataJson(data: [], database: string) {
    const filePath = `./database/${database}.json`;
    const fileJson = JSON.stringify(data);
    return fs.writeFileSync(filePath, fileJson);
}

export default saveDataJson;