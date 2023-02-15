import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
const short = require('short-uuid');
const cuttly = require('cuttly');
import QRCode from 'qrcode';
import { Logger } from '@demo/shared-server/logging';
import { User } from '@demo/+auth/core';
import { GetAllQueryDto, GetAllResponseDto } from '@demo/shared/utils';
import {
  CreateListDto,
  GetAllListDto,
  List,
  PatchListDto,
  getAllListListFromListList,
  GetPublicListDto,
  ListStatus,
  ProductStatus,
  getAllProductListFromProductList,
  getAllPublicProductProductFromProductProduct,
  handleUrlAffiliate,
} from '@demo/wish-shared/core';
import { ListEntity } from '../entities/list.entity';
import { ListRepository } from '../repositories/list.repository';
import { slugify } from '@demo/shared/utils';
import { ProductRepository } from '../repositories/product.repository';
import { AssetRepository } from '@demo/+asset/server';
import { PIX } from '@demo/shared-server/utils/pix';
import { MoreThan } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { Cache } from 'cache-manager';
const human = require('humanparser');

@Injectable()
export class ListService {
  constructor(
    private readonly _listRepository: ListRepository,
    private readonly _assetRepository: AssetRepository,
    private readonly _productRepository: ProductRepository,
    private readonly _logger: Logger,
    private readonly _mailerService: MailerService,
    @Inject(CACHE_MANAGER) private readonly _cacheManager: Cache
  ) {}

  public async notify() {
    const lists = await this._listRepository.find({
      where: { status: ListStatus.ACTIVE, eventDate: MoreThan(new Date()) },
      relations: ['products'],
    });

    for (const list of lists) {
      const products = list.products.filter((p) => p.person && p.person.email);

      for (const product of products) {
        try {
          const productUrl = product.url ? handleUrlAffiliate(product.url) : null;
          const days = Math.ceil((list.eventDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
          const personName = human.parseName(product.person.name);
          const lackString = days == 1 ? 'falta' : 'faltam';
          const lackStringUpper = days == 1 ? 'Falta' : 'Faltam';
          const dayString = days == 1 ? 'dia' : 'dias';
          const listUrl = `${process.env.BASE_APP_PATH}/${list.slug}`;

          if (days > 0 && days % 2) {
            await this._mailerService.sendMail({
              to: product.person.email,
              subject: `🎉 ${lackStringUpper} ${days} ${dayString} para o ${list.name}!`,
              template: join(__dirname, 'email-templates', 'person-reminder'),
              context: {
                days,
                listName: list.name,
                personName: personName?.firstName || product.person.name,
                productName: product.name,
                listUrl,
                productUrl,
                dayString,
                lackString,
              },
            });
          }
        } catch (error) {
          this._logger.error('ListService.notify', error);
        }
      }
    }
  }

  public async public(listSlug: string): Promise<GetPublicListDto> {
    const cached = await this._cacheManager.get(listSlug);

    if (cached) {
      return JSON.parse(cached as any);
    }

    const list = await this._listRepository.findOne({
      where: { slug: listSlug, status: ListStatus.ACTIVE },
      relations: ['profile', 'banner'],
    });

    if (!list) {
      throw new NotFoundException(['List not found.']);
    }

    const products = await this._productRepository.find({
      where: { list, status: ProductStatus.ACTIVE },
      relations: ['images', 'person'],
    });

    const res = {
      id: list.id,

      name: list.name,

      slug: list.slug,

      shortUrl: list.shortUrl,

      desc: list.desc,

      theme: list.theme,

      eventDate: list.eventDate,

      eventLocation: list.eventLocation,

      pix: list.pix,

      pixCode: list.pixCode,

      pixQr: list.pixQr,

      profileUrl: list.profile?.accessUrl || null,

      bannerUrl: list.banner?.accessUrl || null,

      products: getAllPublicProductProductFromProductProduct(products),
    };

    await this._cacheManager.set(listSlug, JSON.stringify(res), { ttl: 0 });

    return res;
  }

  public async getAll(query: GetAllQueryDto, user: User): Promise<GetAllResponseDto<GetAllListDto>> {
    const { account } = user;
    const { page, take } = query;
    const skip = page * take;

    const lists = await this._listRepository.find({
      where: { account },
      order: { createdAt: 'DESC' },
      ...(take === -1 ? {} : { take, skip }),
      relations: ['profile'],
    });

    const totalAmount = await this._listRepository.count({
      where: { account },
    });

    const totalPages = totalAmount !== 0 ? (take !== -1 ? Math.ceil(totalAmount / take) : 1) : 0;

    return {
      totalAmount,
      totalPages,
      data: getAllListListFromListList(lists),
    };
  }

  public async get(listId: string, user: User): Promise<List> {
    const { account } = user;

    const list = await this._listRepository.findOne({
      where: { id: listId, account },
      relations: ['profile', 'banner'],
    });

    if (!list) {
      throw new NotFoundException(['List not found.']);
    }

    return list;
  }

  public async delete(listId: string, user: User): Promise<void> {
    const { account } = user;

    const list = await this._listRepository.findOne({
      where: { account, id: listId },
    });

    if (!list) {
      throw new NotFoundException(['List not found.']);
    }

    await this._cacheManager.del(list.slug);

    await this._listRepository.softRemove(list);
  }

  public async create(createDto: CreateListDto, user: User): Promise<List> {
    const { account } = user;

    const list = new ListEntity();

    list.name = createDto.name;
    list.slug = slugify(`${short().generate()}`);
    list.desc = createDto.desc;
    list.account = account;

    list.theme = {
      id: 'basic',
      background: '#fff',
      color: '#1F2937',
      borderColor: '#F3F4F6',
    };

    const savedList = await this._listRepository.save(list);

    savedList.slug = slugify(`${savedList.name}-${short().fromUUID(savedList.id)}`);

    await this._listRepository.save(savedList);

    const res = await this.get(savedList.id, user);

    this._logger.log(`🎁 New list created! [${res.slug}]`);

    return res;
  }

  public async patch(patchDto: PatchListDto, user: User): Promise<List> {
    const { account } = user;

    const list = await this._listRepository.findOne({
      where: { account, id: patchDto.id },
      relations: ['account'],
    });

    if (!list) {
      throw new NotFoundException(['List not found.']);
    }

    list.name = 'name' in patchDto ? patchDto.name : list.name;
    list.desc = 'desc' in patchDto ? patchDto.desc : list.desc;
    list.pix = 'pix' in patchDto ? patchDto.pix : list.pix;
    list.eventDate = 'eventDate' in patchDto ? patchDto.eventDate : list.eventDate;
    list.eventLocation = 'eventLocation' in patchDto ? patchDto.eventLocation : list.eventLocation;

    if ('pix' in patchDto && list.pix) {
      const pix = PIX.static();
      pix.setReceiverName(list.name);
      pix.setReceiverCity('BRASILIA');
      pix.setKey(list.pix.replace(/\D/g, ''));
      // pix.setAmount(generatePixDto.amount);
      list.pixCode = pix.getBRCode();
      list.pixQr = await QRCode.toDataURL(list.pixCode, { width: '800' });
    } else if ('pix' in patchDto && !list.pix) {
      list.pixCode = null;
      list.pixQr = null;
    }

    if ('bannerId' in patchDto) {
      list.banner = patchDto.bannerId
        ? await this._assetRepository.findOne({
            where: { id: patchDto.bannerId },
          })
        : null;
    }

    if ('profileId' in patchDto) {
      list.profile = patchDto.profileId
        ? await this._assetRepository.findOne({
            where: { id: patchDto.profileId },
          })
        : null;
    }

    await this._listRepository.save(list);

    await this._cacheManager.del(list.slug);

    return await this.get(list.id, user);
  }
}
