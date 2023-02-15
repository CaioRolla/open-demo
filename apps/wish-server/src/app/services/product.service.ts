import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AssetRepository } from '@demo/+asset/server';
import { User } from '@demo/+auth/core';
import { GetAllResponseDto } from '@demo/shared/utils';
import {
  ClonePlatformProductDto,
  CreateProductDto,
  GetAllProductDto,
  getAllProductListFromProductList,
  GetAllProductQueryDto,
  getSelectProductResponseFromProduct,
  PatchProductDto,
  PlatformProductStatus,
  Product,
  ProductStatus,
  SelectProductResponseDto,
  UnselectProductDto,
} from '@demo/wish-shared/core';
import { In, Like } from 'typeorm';
import { SelectProductDto } from '../dtos/product/select-product.dto';
import { PersonEntity } from '../entities/person.entity';
import { ProductEntity } from '../entities/product.entity';
import { ListRepository } from '../repositories/list.repository';
import { PersonRepository } from '../repositories/person.repository';
import { ProductRepository } from '../repositories/product.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductSelectedEvent } from '../events/product/product-selected.event';
import { ProductUnselectedEvent } from '../events/product/product-unselected.event';
import { PersonCreatedEvent } from '../events/person/person-created.event';
import { PlatformProductRepository } from '../repositories/platform-product.repository';
import { ShopeeService } from '@demo/shared-server/shopee';
import { Logger } from '@demo/shared-server/logging';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    private readonly _productRepository: ProductRepository,
    private readonly _platformProductRepository: PlatformProductRepository,
    private readonly _assetRepository: AssetRepository,
    private readonly _listRepository: ListRepository,
    private readonly _personRepository: PersonRepository,
    private readonly _eventEmitter: EventEmitter2,
    private readonly _shopeeService: ShopeeService,
    private readonly _logger: Logger,
    @Inject(CACHE_MANAGER) private readonly _cacheManager: Cache
  ) {
  }

  // private async _migration() {
  //   const products = await this._productRepository.find({
  //     where: { url: Like('%shopee.com.br%') },
  //   });

  //   for (const product of products) {
  //     try {
  //       const { data: res } = await this._shopeeService.generateShortLink(
  //         product.url
  //       );

  //       if (res.data && res.data.generateShortLink && res.data.generateShortLink.shortLink) {
  //         product.url = res.data.generateShortLink.shortLink;
  //         this._productRepository.save(product);
  //       } else {
  //         this._logger.error('ProductService._migration', `No short link!!!! - ${product.id}`);
  //       }
  //     } catch (error) {
  //       this._logger.error('ProductService._migration', error);
  //     }
  //   }

  //   this._logger.log(`Shopee migration finished!`);
  // }

  public async unselect(unselectDto: UnselectProductDto) {
    const product = await this._productRepository.findOne({
      where: { id: unselectDto.productId, status: ProductStatus.ACTIVE },
      relations: ['person', 'list'],
    });


    const personId = product.person.id;

    if (!product) {
      throw new NotFoundException(['Product not found.']);
    }

    if (product.person && product.person.email !== unselectDto.personEmail) {
      throw new ConflictException(['Product was selected by somebody else.']);
    }


    product.person = null;

    await this._productRepository.save(product);

    await this._cacheManager.del(product.list.slug);

    this._eventEmitter.emit(
      ProductUnselectedEvent.event,
      new ProductUnselectedEvent(product.id, personId)
    );
  }

  public async select(
    selectDto: SelectProductDto
  ): Promise<SelectProductResponseDto> {
    const product = await this._productRepository.findOne({
      where: { id: selectDto.productId, status: ProductStatus.ACTIVE },
      relations: ['person', 'account', 'account.users', 'list'],
    });

    if (!product) {
      throw new NotFoundException(['Product not found.']);
    }

    if (product.person) {
      throw new ConflictException([
        'Product already selected by somebody else.',
      ]);
    }

   

    const existingPerson = await this._personRepository.findOne({
      where: { email: selectDto.personEmail },
    });

    product.person = existingPerson || new PersonEntity();

    product.person.name = selectDto.personName;
    product.person.email = selectDto.personEmail;

    await this._cacheManager.del(product.list.slug);

    await this._productRepository.save(product);

    if (!existingPerson) {
      this._eventEmitter.emit(
        PersonCreatedEvent.event,
        new PersonCreatedEvent(product.person)
      );
    }

    this._eventEmitter.emit(
      ProductSelectedEvent.event,
      new ProductSelectedEvent(product.id)
    );

    return getSelectProductResponseFromProduct(product);
  }

  public async getAll(
    query: GetAllProductQueryDto,
    user: User
  ): Promise<GetAllResponseDto<GetAllProductDto>> {
    const { account } = user;
    const { page, take } = query;
    const skip = page * take;

    const products = await this._productRepository.find({
      where: {
        account,
        ...(query.listId ? { list: { id: query.listId } } : {}),
      },
      order: { createdAt: 'DESC' },
      ...(take === -1 ? {} : { take, skip }),
      relations: ['images', 'person'],
    });

    const totalAmount = await this._productRepository.count({
      where: {
        account,
        ...(query.listId ? { list: { id: query.listId } } : {}),
      },
    });

    const totalPages =
      totalAmount !== 0 ? (take !== -1 ? Math.ceil(totalAmount / take) : 1) : 0;

    return {
      totalAmount,
      totalPages,
      data: getAllProductListFromProductList(products),
    };
  }

  public async get(productId: string, user: User): Promise<Product> {
    const { account } = user;

    const product = await this._productRepository.findOne({
      where: { id: productId, account },
      relations: ['person'],
    });

    if (!product) {
      throw new NotFoundException(['Product not found.']);
    }

    product.images = product.images.sort((a, b) => a.orderIndex - b.orderIndex);

    return product;
  }

  public async delete(productId: string, user: User): Promise<void> {
    const { account } = user;

    const product = await this._productRepository.findOne({
      where: { account, id: productId },
      relations: ['list']
    });

    if (!product) {
      throw new NotFoundException(['Product not found.']);
    }

    await this._cacheManager.del(product.list.slug);

    await this._productRepository.softRemove(product);
  }

  public async create(
    createDto: CreateProductDto,
    user: User
  ): Promise<Product> {
    const { account } = user;

    const list = await this._listRepository.findOne({
      where: { id: createDto.listId },
    });

    if (!list) {
      throw new NotFoundException(['List not found.']);
    }



    const product = new ProductEntity();

    product.account = account;
    product.list = list;
    product.name = createDto.name;
    product.desc = createDto.desc;
    product.estimatedPrice = createDto.estimatedPrice;
    product.status = ProductStatus.ACTIVE;
    product.url = createDto.url;

    if (createDto.url.includes('shopee.com.br')) {
      try {
        const { data: res } = await this._shopeeService.generateShortLink(
          createDto.url
        );
        if (res.data.generateShortLink.shortLink)
          product.url = res.data.generateShortLink.shortLink;
      } catch (error) {
        this._logger.error('ProductService.create', error);
      }
    }

    const images = await this._assetRepository.find({
      where: { id: In(createDto.imagesIds) },
      order: { orderIndex: 'ASC' },
    });

    const sortedImages = images
      .map((i) => {
        i.orderIndex = createDto.imagesIds.indexOf(i.id);
        return i;
      })
      .sort((a, b) => a.orderIndex - b.orderIndex);

    product.images = createDto.imagesIds ? sortedImages : null;

    const savedProduct = await this._productRepository.save(product);

    await this._cacheManager.del(list.slug);

    return await this._productRepository.findOne({
      where: { account, id: savedProduct.id },
    });
  }

  public async clonePlatformProduct(
    cloneDto: ClonePlatformProductDto,
    user: User
  ): Promise<Product[]> {
    const { account } = user;

    const list = await this._listRepository.findOne({
      where: {
        account,
        id: cloneDto.listId,
        status: PlatformProductStatus.ACTIVE,
      },
    });

    if (!list) {
      throw new NotFoundException(['List not found.']);
    }

    const platformProducts = await this._platformProductRepository.find({
      where: { id: In(cloneDto.platformProductIds) },
    });

    return await Promise.all(
      platformProducts.map(async (plat) => {
        const product = new ProductEntity();

        product.account = account;
        product.list = list;
        product.name = plat.name;
        product.desc = plat.desc;
        product.estimatedPrice = plat.estimatedPrice;
        product.status = ProductStatus.ACTIVE;
        product.url = plat.url;
        product.images = plat.images;

        const savedProduct = await this._productRepository.save(product);

        return await this._productRepository.findOne({
          where: { account, id: savedProduct.id },
        });
      })
    );
  }

  public async patch(patchDto: PatchProductDto, user: User): Promise<Product> {
    const { account } = user;

    const product = await this._productRepository.findOne({
      where: { account, id: patchDto.id },
      relations: ['account'],
    });

    if (!product) {
      throw new NotFoundException(['Product not found.']);
    }

    product.name = 'name' in patchDto ? patchDto.name : product.name;
    product.desc = 'desc' in patchDto ? patchDto.desc : product.desc;
    product.url = 'url' in patchDto ? patchDto.url : product.url;

    if ('url' in patchDto && patchDto.url.includes('shopee.com.br')) {
      try {
        const { data: res } = await this._shopeeService.generateShortLink(
          patchDto.url
        );
        if (res.data.generateShortLink.shortLink)
          product.url = res.data.generateShortLink.shortLink;
      } catch (error) {
        this._logger.error('ProductService.patch', error);
      }
    }

    product.estimatedPrice =
      'estimatedPrice' in patchDto
        ? patchDto.estimatedPrice
        : product.estimatedPrice;

    if ('personId' in patchDto) {
      product.person = patchDto.personId
        ? await this._personRepository.findOne({
            where: { id: patchDto.personId },
          })
        : null;
    }

    if ('imagesIds' in patchDto) {
      const images = await this._assetRepository.find({
        where: { id: In(patchDto.imagesIds) },
        order: { orderIndex: 'ASC' },
      });

      const sortedImages = images
        .map((i) => {
          i.orderIndex = patchDto.imagesIds.indexOf(i.id);
          return i;
        })
        .sort((a, b) => a.orderIndex - b.orderIndex);

      product.images = patchDto.imagesIds ? sortedImages : null;
    }

    await this._productRepository.save(product);

    return await this._productRepository.findOne({
      where: { account, id: patchDto.id },
    });
  }
}
