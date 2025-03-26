import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GoogleDriveService {
  private driveClient;

  constructor() {
    const keyFilePath = path.resolve(
      process.cwd(),
      'src/file/services/credentials.json',
    );
    if (!fs.existsSync(keyFilePath)) {
      throw new InternalServerErrorException(
        'Google Drive credentials file not found',
      );
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    this.driveClient = google.drive({ version: 'v3', auth });
  }

  async uploadFile(filePath: string, fileName: string) {
    try {
      const fileMetadata = {
        name: fileName,
        parents: ['1YOaTu-_Z_t0_UAW1YE5MB9LdMJukMTG8'],
      };

      const media = {
        mimeType: 'image/png',
        body: fs.createReadStream(filePath),
      };

      const response = await this.driveClient.files.create({
        requestBody: fileMetadata,
        media,
        fields: 'id',
      });

      return response.data.id;
    } catch (error) {
      console.error('Google Drive upload error:', error);
      throw new InternalServerErrorException('Failed to upload file to Drive');
    }
  }

  async getFile(fileId: string) {
    try {
      const response = await this.driveClient.files.get({
        fileId: fileId,
        alt: 'media',
      });

      return response.data;
    } catch (error) {
      console.error('Google Drive read error:', error);
      throw new InternalServerErrorException('Failed to read file from Drive');
    }
  }

  async getFileUrl(fileId: string) {
    try {
      await this.driveClient.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      return `https://drive.google.com/uc?id=${fileId}`;
    } catch (error) {
      console.error('Google Drive URL error:', error);
      throw new InternalServerErrorException('Failed to generate file URL');
    }
  }
}
