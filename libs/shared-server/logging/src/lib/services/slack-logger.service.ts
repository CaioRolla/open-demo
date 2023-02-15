import { Injectable,  LoggerService, Provider } from '@nestjs/common';
import { Logger } from './logger.service';
const Slack = require('slack');

export interface SlackLoggerConfig {
  botToken: string;

  logChannelId: string;
  errorChannelId: string;
  warnChannelId: string;
}

@Injectable()
export class SlackLogger implements LoggerService {
  public readonly bot = new Slack({ token: this.config.botToken });

  constructor(public config: SlackLoggerConfig) {}

  public async log(message: any, context?: string) {
    this.bot.chat.postMessage({
      channel: this.config.logChannelId,
      text: message,
    })
    .catch((err) => console.log('Slack Error:', err))
  }

  public async error(message: any, trace?: string, context?: string) {
    this.bot.chat.postMessage({
      channel: this.config.errorChannelId,
      text: `${message} ### ${trace}`,
    })
    .catch((err) => console.log('Slack Error:', err))
  }

  public async warn(message: any, context?: string) {
    this.bot.chat.postMessage({
      channel: this.config.warnChannelId,
      text: `${message} ### ${context}`,
    })
    .catch((err) => console.log('Slack Error:', err))
  }
}

export const slackLoggerFactory = (
  config: SlackLoggerConfig
): Provider<any> => {
  return {
    provide: Logger,
    useValue:
      process.env.NODE_ENV === 'dev'
        ? new Logger()
        : new SlackLogger(config),
  };
};
