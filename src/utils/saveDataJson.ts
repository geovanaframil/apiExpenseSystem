import fs from 'fs';

function saveDataJson(data: any, database: string) {
    const filePath = `./database/${database}.json`;
    const fileJson = JSON.stringify(data);
    return fs.writeFileSync(filePath, fileJson);
}

export default saveDataJson;