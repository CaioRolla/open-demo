import { Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';

import { Logger } from '@demo/shared-server/logging';
import { UploadConfig } from '../upload.config';

@Injectable()
export class UploadService {
  constructor(
    private readonly _config: UploadConfig,
    private readonly _logger: Logger,
    @InjectS3() private readonly _s3: S3
  ) {}

  public async getStream(key: string) {
    const params = {
      Bucket: this._config.s3BucketName,
      Key: key,
    };

    return this._s3.getObject(params).createReadStream();
  }

  public async uploadBuffer(
    buffer: Buffer,
    fileName: string,
    mimeType: string,
    secure = false
  ): Promise<any> {
    const params = {
      Bucket: this._config.s3BucketName,
      ContentType: mimeType,
      Key: fileName,
      Body: buffer,
      ACL: secure ? 'private' : 'public-read',
    };

    return await new Promise((resolve, reject) => {
      this._s3.upload(params, (err, data) => {
        if (err) {
          this._logger.error(err.message, err);
          reject(err.message);
        }
        resolve({
          url: data.Location,
        });
      });
    });
  }
}
