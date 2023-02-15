import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AssetService } from '@demo/+asset/server';
import { User } from '@demo/+auth/core';
import { ProductData } from '@demo/wish-shared/core';
import { firstValueFrom } from 'rxjs';
import { AmazonBRStrategy } from '../strategies/amazon-br.strategy';
const queryString = require('query-string');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const AnonymizePlugin = require('puppeteer-extra-plugin-anonymize-ua');
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
puppeteer.use(RecaptchaPlugin());
puppeteer.use(AnonymizePlugin());

import { Strategy } from '../strategies/base.strategy';
import { DefaultStrategy } from '../strategies/default.strategy';

const waitTillHTMLRendered = async (page, timeout = 30000) => {
  const checkDurationMsecs = 1000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    let html = await page.content();
    let currentHTMLSize = html.length;

    // let bodyHTMLSize = await page.evaluate(
    //   () => document.body.innerHTML.length
    // );

    // console.log(
    //   'last: ',
    //   lastHTMLSize,
    //   ' <> curr: ',
    //   currentHTMLSize,
    //   ' body html size: ',
    //   bodyHTMLSize
    // );

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      // console.log('Page rendered fully..');
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitForTimeout(checkDurationMsecs);
  }
};

@Injectable()
export class ProductDataService {
  constructor(
    private readonly _assetService: AssetService,
    private readonly _http: HttpService
  ) {}

  public async get(url: string, user: User): Promise<Partial<ProductData>> {
    const parsedURL = new URL(url);

    parsedURL.hash = '';
    parsedURL.search = '';

    if (!this._isSupported(parsedURL.hostname)) {
      return {
        url: parsedURL.toString(),
        images: []
      };
    }

    const {data: html, url: finalUrl} = await this._extractHtml(url);

    const parsedFinalURL = new URL(finalUrl);
    parsedFinalURL.hash = '';
    parsedFinalURL.search = '';

    const strategy = this._selector(parsedURL.hostname);

    const data = await this._context(html, strategy);

    try {
      const assets = await Promise.all(
        (data.images || [])
          .map((url) => (url.startsWith('//') ? 'https:' + url : url))
          .slice(0, 4)
          .map((url) => this._assetService.createFromUrl(url).catch(() => null))
      );

      return {
        ...data,
        url: parsedFinalURL.toString(),
        images: assets.filter((v) => !!v).map((a) => a.id),
      };
    } catch (error) {
      return {
        ...data,
        url: parsedFinalURL.toString(),
        images: [],
      };
    }
  }

  private _selector(hostname): Strategy {
    const strategies = {
      ['amazon.com.br']: new AmazonBRStrategy(),
      ['amazon.com']: new AmazonBRStrategy(),
      ['amzn.to']: new AmazonBRStrategy(),
      ['a.co']: new AmazonBRStrategy(),
    };

    return (
      strategies[hostname.replace('www.', '').toLowerCase()] ||
      new DefaultStrategy()
    );
  }

  private async _context(html: string, strategy: Strategy) {
    return await strategy.extract(html);
  }

  private _isSupported(hostname: string): boolean {
    const unsupported = ['americanas.com', 'americanas.com.br'];

    return !unsupported.includes(hostname.replace('www.', ''));
  }

  private async _extractHtml(url: string): Promise<{ data: string, url: string }> {
    console.log(url);
    let browser: any;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--single-process',
          '--no-zygote',
          '--no-sandbox',
          '--incognito',
          '--disable-dev-shm-usage'
        ],
      });
      const page = await browser.newPage();
      await page.setViewport({ width: 414, height: 896 });
      await page.goto(url, { waitUntil: 'load' });
      await waitTillHTMLRendered(page);
      await page.findRecaptchas();
      await page.solveRecaptchas();

      const finalUrl: string =
        (await page.url()) ||
        (await page.evaluate(() => document.location.href));

      const data = await page.content();
      return { data, url: finalUrl };
    } catch (error) {
      console.error(error)
      const { data } = await firstValueFrom(this._http.get(url, {}));
      return { data, url };
    } finally {
      if(browser) await browser.close();
    }
  }
}
