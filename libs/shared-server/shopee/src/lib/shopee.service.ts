import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
const crypto = require('crypto');
import { ShopeeConfig } from './shopee.config';

@Injectable()
export class ShopeeService {
  private _url = 'https://open-api.affiliate.shopee.com.br/graphql';

  constructor(
    private readonly _config: ShopeeConfig,
    private readonly _http: HttpService
  ) {}

  public async generateShortLink(originUrl: string) {
    const timestamp = Math.floor(+new Date() / 1000);

    const body = {
      query: `mutation{ generateShortLink(input:{originUrl:"${originUrl}",subIds:[]}){shortLink}}`,
    };

    const factor = `${this._config.appId}${timestamp}${JSON.stringify(body)}${
      this._config.secret
    }`;

    const sha = crypto.createHash('sha256').update(factor).digest('hex');

    const authorization = `SHA256 Credential=${this._config.appId},Timestamp=${timestamp},Signature=${sha}`;

    return await this._http
      .post<{  data: { generateShortLink: { shortLink: string } } }>(this._url, body, {
        headers: {
          Authorization: authorization,
        },
      })
      .toPromise();
  }
}
