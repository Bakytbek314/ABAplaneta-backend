import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import *as fs from "fs";
import *as path from "path";
import *as uuid from "uuid";

@Injectable()
export class FileService {
    async createFile(file: any): Promise<string> {
        try {
            const fileExtension = path.extname(file.originalname);
            const fileName = uuid.v4() + fileExtension;
            const filePath = path.resolve(__dirname, "../..", "static");
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join( filePath, fileName), file.buffer);
            return fileName;
        } catch (error) {
            throw new HttpException("Ошибка при записи файла", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}