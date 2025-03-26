import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from '../services/file.service';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@ApiTags('File')
//@ApiBearerAuth()
@Controller('file')
export class FileController {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  @ApiOperation({ summary: 'Upload an image to Google Drive' })
  @ApiResponse({
    status: 200,
    description: 'File uploaded successfully',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: undefined,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const tempDir = path.join(__dirname, '..', '..', 'temp');
    const tempPath = path.join(tempDir, file.originalname);

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    fs.writeFileSync(tempPath, file.buffer);

    try {
      const fileId = await this.googleDriveService.uploadFile(
        tempPath,
        file.originalname,
      );

      return {
        message: 'File uploaded successfully',
        fileId,
      };
    } finally {
      fs.unlinkSync(tempPath);
    }
  }

  @ApiOperation({ summary: 'Get image from Google Drive' })
  @ApiResponse({
    status: 200,
    description: 'Returns the file content',
  })
  @Get(':fileId')
  async getFile(@Param('fileId') fileId: string) {
    return this.googleDriveService.getFile(fileId);
  }

  @ApiOperation({ summary: 'Get file URL from Google Drive' })
  @ApiResponse({
    status: 200,
    description: 'Returns the file URL',
  })
  @Get(':fileId/url')
  async getFileUrl(@Param('fileId') fileId: string) {
    return this.googleDriveService.getFileUrl(fileId);
  }
}
