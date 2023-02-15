import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import Jimp from 'jimp';
import { v4 as uuid4 } from 'uuid';

import { AssetRepository } from '../repositories/asset.repository';
import { UploadService } from '@demo/shared-server/upload';
import { Asset } from '@demo/+asset/core';
import { AssetEntity } from '../..';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AssetService {
  constructor(
    private readonly _assetRepository: AssetRepository,
    private readonly _uploadService: UploadService,
    private readonly _http: HttpService
  ) {}

  public async get(assetId: string): Promise<Asset> {
    const asset = await this._assetRepository.findOne({
      where: { id: assetId },
    });

    if (!asset) {
      throw new NotFoundException(['Asset not found.']);
    }

    return asset;
  }

  public async createFromUrl(imageUrl: string, secure = false): Promise<Asset> {
    const buffer = await firstValueFrom(
      this._http.get(imageUrl, { responseType: 'arraybuffer' })
    ).then((response) => {
      return Buffer.from(response.data, 'base64');
    });

    const asset = new AssetEntity();
    const jimp = await Jimp.read(buffer);
    const extension = jimp.getExtension();
    const filename = `${uuid4()}.${extension}`;

    asset.mimeType = jimp.getMIME();
    asset.size = buffer.length;
    asset.originalname = filename;

    const savedAsset = await this._assetRepository.save(asset);

    const { url } = await this._uploadService.uploadBuffer(
      buffer,
      `assets/${savedAsset.id}/${filename}`,
      jimp.getMIME(),
      secure
    );

    savedAsset.url = url;

    return await this._assetRepository.save(asset);
  }

  public async create(file: Express.Multer.File, secure = false): Promise<Asset> {
    const asset = new AssetEntity();

    asset.mimeType = file.mimetype;
    asset.size = file.size;
    asset.originalname = file.originalname;
    asset.token = secure ? uuid4() : null;

    const savedAsset = await this._assetRepository.save(asset);

    const { url } = await this._uploadService.uploadBuffer(
      file.buffer,
      `assets/${savedAsset.id}/${file.originalname}`,
      file.mimetype,
      secure
    );

    savedAsset.url = url;

    await this._assetRepository.save(asset);

    return await this.get(savedAsset.id);
  }
}
