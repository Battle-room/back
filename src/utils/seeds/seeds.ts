import * as fs from 'fs';
import * as path from 'path';

export async function seeder() {
  createPublicDir();
}

function createPublicDir() {
  const publicDir = path.join(__dirname, '..', '..', '..', 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log(`Directory ${publicDir} created.`);
  } else {
    console.log(`Directory ${publicDir} already exists.`);
  }
}