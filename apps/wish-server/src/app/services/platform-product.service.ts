import { Injectable } from '@nestjs/common';
import { User } from '@demo/+auth/core';
import { GetAllQueryDto, GetAllResponseDto } from '@demo/shared/utils';
import {
  GetAllPlatformProductDto,
  getAllPlatformProductListFromPlatformProductList,
  PlatformProductStatus,
} from '@demo/wish-shared/core';
import { PlatformProductRepository } from '../repositories/platform-product.repository';


@Injectable()
export class PlatformProductService {
  constructor(
    private readonly _platformProductRepository: PlatformProductRepository
  ) {}

  public async getAll(
    query: GetAllQueryDto,
    user: User
  ): Promise<GetAllResponseDto<GetAllPlatformProductDto>> {
    const { page, take } = query;
    const skip = page * take;

    const products = await this._platformProductRepository.find({
      where: {
        status: PlatformProductStatus.ACTIVE,
      },
      order: { createdAt: 'DESC' },
      ...(take === -1 ? {} : { take, skip }),
      relations: ['images'],
    });

    const totalAmount = await this._platformProductRepository.count({
      where: {
        status: PlatformProductStatus.ACTIVE,
      },
    });

    const totalPages =
      totalAmount !== 0 ? (take !== -1 ? Math.ceil(totalAmount / take) : 1) : 0;

    return {
      totalAmount,
      totalPages,
      data: getAllPlatformProductListFromPlatformProductList(products),
    };
  }
}
