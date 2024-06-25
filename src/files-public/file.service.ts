import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class FileService {
  private readonly fileDir: string = path.join(__dirname, '..', '..', 'public');

  uploadFile(file: Express.Multer.File): string {
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(this.fileDir, uniqueFileName);

    fs.writeFileSync(filePath, file.buffer);

    return uniqueFileName;
  }

  deleteFile(fileName: string): void {
    const filePath = path.join(this.fileDir, fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else {
      throw new Error('File not found');
    }
  }
}
