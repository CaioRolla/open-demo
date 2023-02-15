import { HttpService, Injectable } from '@nestjs/common';
const { simpleSitemapAndIndex } = require('sitemap');
import * as _ from 'lodash';

import { Logger } from '@demo/shared-server/logging';
import { SitemapEntry } from '../interfaces';
import { SharedServerSitemapConfig } from '../shared-server-sitemap.config';

@Injectable()
export class SitemapService {
  constructor(
    private readonly _config: SharedServerSitemapConfig,
    private readonly _httpService: HttpService,
    private readonly _logger: Logger
  ) {}

  public async generate(entries: SitemapEntry[]): Promise<void> {
    try {
      await simpleSitemapAndIndex({
        hostname: this._config.hostname,
        sourceData: [...entries],
        destinationDir: this._config.destinationDir,
      });

      if (this._config.googlePingPath) {
        await this._httpService
          .get(
            `https://www.google.com/webmasters/sitemaps/ping?sitemap=${this._config.googlePingPath}`
          )
          .toPromise();
      }
    } catch (error) {
      this._logger.error('SitemapService:generate', error);
    }
  }
}
