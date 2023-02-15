import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AssetRepository } from '@demo/+asset/server';

import {
  User,
  GetAllUserDto,
  getAllUserListFromUserList,
  PatchUserDto,
  UserStatus,
  UserBasicPermission,
} from '@demo/+auth/core';
import { GetAllQueryDto, GetAllResponseDto } from '@demo/shared/utils';
import { AccountRepository } from '../repositories/account.repository';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository
  ) {}

  public async getAll(
    query: GetAllQueryDto,
    user: User
  ): Promise<GetAllResponseDto<GetAllUserDto>> {
    const { account } = user;
    const { page, take } = query;
    const skip = page * take;

    const users = await this._userRepository.find({
      where: { account },
      order: { createdAt: 'DESC' },
      ...(take === -1 ? {} : { take, skip }),
    });

    const totalAmount = await this._userRepository.count({
      where: { account },
    });

    const totalPages =
      totalAmount !== 0 ? (take !== -1 ? Math.ceil(totalAmount / take) : 1) : 0;

    return {
      totalAmount,
      totalPages,
      data: getAllUserListFromUserList(users),
    };
  }

  public async patch(patchDto: PatchUserDto, user: User): Promise<User> {
    const { account } = user;

    if (!user.permissions.includes(UserBasicPermission.TEAM_PATCH_USER)) {
      throw new UnauthorizedException([
        "You don't have permission to update this user informations.",
      ]);
    }

    const patchUser = await this._userRepository.findOne({
      where: { id: patchDto.id, account },
    });

    if (patchUser.status === UserStatus.PENDING_CONFIRMATION) {
      throw new BadRequestException(['User pending email confirmation']);
    }

    if (patchUser.accountOwner) {
      throw new BadRequestException(["Owner can't be modified"]);
    }

    if (
      !('status' in patchDto) &&
      'permissions' in patchDto &&
      patchUser.status === UserStatus.DISABLED
    ) {
      throw new BadRequestException(['User is already disabled']);
    }

    patchUser.status =
      'status' in patchDto ? patchDto.status : patchUser.status;
    patchUser.permissions =
      'permissions' in patchDto ? patchDto.permissions : patchUser.permissions;

    const savedUser = await this._userRepository.save(patchUser);

    return savedUser;
  }
}
