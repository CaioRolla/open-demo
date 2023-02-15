import {
  Get,
  Controller,
  Render,
  Res,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';

import { join } from 'path';
import { Response } from 'express';

@Controller('')
export class SitemapController {
  @Get('/sitemap.xml')
  public sitemap(@Res() res: Response) {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');

    res.sendFile(join(__dirname, 'assets', 'sitemap-0.xml.gz'));
  }

  @Get('/robots.txt')
  public robots(@Res() res: Response) {
    res.type('text/plain');
    res.send("User-agent: *\nAllow: /");
  }
}
