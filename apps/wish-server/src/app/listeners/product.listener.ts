import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { join } from 'path';
const human = require('humanparser');

import { Logger } from '@demo/shared-server/logging';
import { ProductSelectedEvent } from '../events/product/product-selected.event';
import { ProductRepository } from '../repositories/product.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { ProductUnselectedEvent } from '../events/product/product-unselected.event';
import { PersonRepository } from '../repositories/person.repository';

@Injectable()
export class ProductListener {
  constructor(
    private readonly _logger: Logger,
    private readonly _productRepository: ProductRepository,
    private readonly _personRepository: PersonRepository,
    private readonly _mailerService: MailerService
  ) {}

  @OnEvent(ProductUnselectedEvent.event)
  public async handleProductUnselectedEvent(payload: ProductUnselectedEvent) {
    try {
      const product = await this._productRepository.findOne({
        where: { id: payload.productId },
        relations: ['account', 'account.users', 'list'],
      });

      const person = await this._personRepository.findOne({
        where: { id: payload.personId },
      });

      const personName = person.name;

      await this._mailerService.sendMail({
        to: product.account.users[0].email,
        subject: `😡 ${personName} desmarcou um item em ${product.list.name}!`,
        template: join(__dirname, 'email-templates', 'product-unselected'),
        context: {
          personName,
          listName: product.list.name,
          productName: product.name,
          listUrl: `${process.env.BASE_APP_PATH}/list/${product.list.id}`,
        },
      });
    } catch (error) {
      this._logger.error('ProductListener.handleProductSelectedEvent', error);
    }
  }

  @OnEvent(ProductSelectedEvent.event)
  public async handleProductSelectedEvent(payload: ProductSelectedEvent) {
    try {
      const product = await this._productRepository.findOne({
        where: { id: payload.productId },
        relations: ['person', 'account', 'account.users', 'list'],
      });

      const personName = product.person.name;

      await this._mailerService.sendMail({
        to: product.account.users[0].email,
        subject: `🎉 ${personName} selecionou um item em ${product.list.name}!`,
        template: join(__dirname, 'email-templates', 'product-selected'),
        context: {
          personName,
          listName: product.list.name,
          productName: product.name,
          listUrl: `${process.env.BASE_APP_PATH}/list/${product.list.id}`,
        },
      });
    } catch (error) {
      this._logger.error('ProductListener.handleProductSelectedEvent', error);
    }
  }
}
