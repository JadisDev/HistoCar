import { Module, Global } from '@nestjs/common';
import { GoogleDriveService } from './services/file.service';
import { FileController } from './controllers/file.controller';

@Global()
@Module({
  providers: [GoogleDriveService],
  controllers: [FileController],
  exports: [GoogleDriveService],
})
export class FileModule {}
