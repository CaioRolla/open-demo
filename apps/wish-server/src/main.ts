import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import * as express from 'express';
const cors = require('cors');
const cloneBuffer = require('clone-buffer');
import { AppModule } from './app/app.module';
import { join } from 'path';
const session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const globalPrefix = 'api';

  app.use(session({ secret: process.env.AUTH_JWT_SECRET }));

  app.use(cors());
  // app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  app.use('/api/assets', express.static(join(__dirname, 'assets')));

  app.use(
    json({
      verify: (req: any, res, buf, encoding) => {
        // important to store rawBody for Stripe signature verification
        if (req.headers['stripe-signature'] && Buffer.isBuffer(buf)) {
          req.rawBody = cloneBuffer(buf);
        }
        return true;
      },
    })
  );

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {});
}

bootstrap();
