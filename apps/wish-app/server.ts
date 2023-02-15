import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import 'zone.js/dist/zone-node';
import { LOCALE_ID } from '@angular/core';
import 'localstorage-polyfill';

global['localStorage'] = localStorage;
global['navigator'] = { share: (...args: any) => {} } as any;

// The Express app is exported so that it can be used by serverless Functions.
export async function app(lang: string): Promise<express.Express> {
  const distFolder = join(process.cwd(), `dist/apps/wish-app/browser/${lang}`);
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  const server = express();

  const { AppServerModule } = require('./src/main.server');
  const { APP_BASE_HREF } = require('@angular/common');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
      extraProviders: [{ provide: LOCALE_ID, useValue: lang }],
    } as any)
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine

  server.get('*', (req, res) => {
    return res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

const run = async () => {
  const port = process.env['PORT'] || 4444;

  // Start up the Node server
  const server = express();

  const appPt = await app('pt');
  // server.use('/en', appEn);
  // server.use('/fr', appFr);
  server.use('/pt', appPt);
  server.use('', appPt);

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
};

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
