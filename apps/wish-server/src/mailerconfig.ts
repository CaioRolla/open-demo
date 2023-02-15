import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

export default {
  transport: {
    port: 465,
    host: 'email-smtp.us-east-1.amazonaws.com',
    secure: true,
    auth: {
      user: process.env.AWS_SES_SMTP_USER,
      pass: process.env.AWS_SES_SMTP_PASS,
    },
    debug: false,
  },
  defaults: {
    from: '"listaideal.com.br" <noreply@caiorolla.com>',
  },
  preview: false,
  template: {
    dir: join(__dirname, 'email-templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
};