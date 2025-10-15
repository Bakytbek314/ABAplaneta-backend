import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class FileService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadStream = () =>
        new Promise<string>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            },
          );
          Readable.from(file.buffer).pipe(stream);
        });

      const secureUrl = await uploadStream();
      return secureUrl;
    } catch (error) {
      throw new HttpException(
        'Ошибка при загрузке файла на Cloudinary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
