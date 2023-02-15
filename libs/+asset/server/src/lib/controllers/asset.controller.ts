import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Express } from 'express';
import 'multer';

import { UploadService } from '@demo/shared-server/upload';
import { AssetService } from '../services/asset.service';

@Controller({
  path: 'asset',
  version: '1',
})
export class AssetController {
  constructor(private readonly _assetService: AssetService, private readonly _uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 100 * 1024 * 1024 * 1024 } }))
  @ApiExcludeEndpoint()
  async asset(@UploadedFile() file: Express.Multer.File, @Query('secure') secure?: string) {
    return await this._assetService.create(file, secure === 'true');
  }

  @Get(':assetId')
  @ApiExcludeEndpoint()
  public async get(@Param('assetId') assetId: string) {
    return this._assetService.get(assetId);
  }

  @Get(':assetId/:originalname')
  @ApiExcludeEndpoint()
  public async getFile(@Param('assetId') assetId: string, @Res() res, @Query('token') token?: string) {
    const asset = await this._assetService.get(assetId);

    if(asset.token && asset.token !== token){
      throw new NotFoundException(['Asset not found.']);
    }

    const stream = await this._uploadService.getStream(`assets/${asset.id}/${asset.originalname}`);
    
    return stream.pipe(res);
  }
}
