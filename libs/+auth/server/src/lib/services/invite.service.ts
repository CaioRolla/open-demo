import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { join } from 'path';

import {
  AcceptInviteDto,
  CreateInviteDto,
  Invite,
  InviteStatus,
  PatchInviteDto,
  RefuseInviteDto,
  User,
  GetAllInviteDto,
  getAllInviteListFromInviteList,
  ResendInviteDto,
} from '@demo/+auth/core';
import { GetAllQueryDto, GetAllResponseDto } from '@demo/shared/utils';
import { InviteEntity } from '../entities/invite.entity';
import { AccountRepository } from '../repositories/account.repository';
import { InviteRepository } from '../repositories/invite.repository';
import { UserRepository } from '../repositories/user.repository';
import { AuthServerConfig } from '../auth-server.config';

@Injectable()
export class InviteService {
  constructor(
    private readonly _inviteRepository: InviteRepository,
    private readonly _userRepository: UserRepository,
    private readonly _accountRepository: AccountRepository,
    private readonly _mailerService: MailerService,
    private readonly _config: AuthServerConfig,
  ) {}

  public async getAll(
    query: GetAllQueryDto,
    user: User
  ): Promise<GetAllResponseDto<GetAllInviteDto>> {
    const { account } = user;
    const { page, take } = query;
    const skip = page * take;

    const invites = await this._inviteRepository.find({
      where: { account },
      order: { createdAt: 'DESC' },
      ...(take === -1 ? {} : { take, skip }),
    });

    const totalAmount = await this._inviteRepository.count({
      where: { account },
    });

    const totalPages =
      totalAmount !== 0 ? (take !== -1 ? Math.ceil(totalAmount / take) : 1) : 0;

    return {
      totalAmount,
      totalPages,
      data: getAllInviteListFromInviteList(invites),
    };
  }

  // public async refuse(refuseDto: RefuseInviteDto, user: User): Promise<void> {
  //   const { account } = user;

  //   const invite = await this._inviteRepository.findOne({
  //     where: { id: refuseDto.id },
  //     relations: ['account'],
  //   });

  //   if (!invite) {
  //     throw new NotFoundException(['Invite not found']);
  //   }

  //   if (invite.account.id === account.id) {
  //     throw new ConflictException(['User already belongs to this account']);
  //   }

  //   if (invite.status === InviteStatus.CANCELED) {
  //     throw new BadRequestException(['Invite canceled']);
  //   }

  //   if (invite.status === InviteStatus.DENIED) {
  //     throw new BadRequestException(['Invite already denied']);
  //   }

  //   if (invite.status === InviteStatus.ACCEPTED) {
  //     throw new BadRequestException(['Invite already accepted']);
  //   }

  //   invite.status = InviteStatus.DENIED;

  //   await this._inviteRepository.save(invite);
  // }

  // public async accept(acceptDto: AcceptInviteDto, user: User): Promise<void> {
  //   const { account } = user;

  //   const invite = await this._inviteRepository.findOne({
  //     where: { id: acceptDto.id },
  //     relations: ['account'],
  //   });

  //   if (!invite) {
  //     throw new NotFoundException(['Invite not found']);
  //   }

  //   if (invite.account.id === account.id) {
  //     throw new ConflictException(['User already belongs to this account']);
  //   }

  //   if (invite.status === InviteStatus.CANCELED) {
  //     throw new BadRequestException(['Invite canceled']);
  //   }

  //   if (invite.status === InviteStatus.DENIED) {
  //     throw new BadRequestException(['Invite already denied']);
  //   }

  //   if (invite.status === InviteStatus.ACCEPTED) {
  //     throw new BadRequestException(['Invite already accepted']);
  //   }

  //   user.account = invite.account;
  //   user.accountOwner = false;
  //   invite.status = InviteStatus.ACCEPTED;

  //   await this._inviteRepository.save(invite);
  //   await this._userRepository.save(user);
  // }

  public async get(id: string, user: User): Promise<Invite> {
    const { account } = user;

    return await this._inviteRepository.findOne({ where: { id, account } });
  }

  public async delete(id: string, user: User): Promise<void> {
    const { account } = user;

    const invite = await this._inviteRepository.findOne({
      where: { id, account },
    });

    if (!invite) {
      throw new NotFoundException(['Invite not found']);
    }

    await this._inviteRepository.softRemove(invite);
  }

  public async create(createDto: CreateInviteDto, user: User): Promise<Invite> {
    const account = await this._accountRepository.findOne({
      where: { id: user.account.id },
      relations: ['users', 'invites'],
    });

    if (createDto.email === user.email) {
      throw new ConflictException(['You cant invite yourself']);
    }

    const existInvite =
      account.invites.filter(
        (i) => i.email === createDto.email && i.status === InviteStatus.PENDING
      ).length > 0;

    if (existInvite) {
      throw new ConflictException(['A invite was already sent to this email']);
    }

    const existUser =
      account.users.filter((u) => u.email === createDto.email).length > 0;

    if (existUser) {
      throw new ConflictException(['This user is already on you account']);
    }

    const anotherAccountUser = await this._userRepository.findOne({ email: createDto.email });

    if (anotherAccountUser) {
      throw new ConflictException(['This user already has an account']);
    }

    const invite = new InviteEntity();

    invite.account = account;
    invite.email = createDto.email;
    invite.status = InviteStatus.PENDING;
    invite.permissions = createDto.permissions;

    const savedInvite = await this._inviteRepository.save(invite);

    await this._mailerService.sendMail({
      to: savedInvite.email,
      subject: `${user.displayName} invited you to ${this._config.appName} 🤩`,
      template: join(
        __dirname,
        'email-templates',
        'invite-confirmation'
      ),
      context: {
        app: {
          logo: this._config.appLogo,
          name: this._config.appName,
          host: this._config.appHost,
          url: this._config.appBasePath,
        },
        user,
        confirmationUrl: `${this._config.appBasePath}/auth/sign-up?inviteId=${savedInvite.id}&email=${savedInvite.email}`,
      },
    });

    return savedInvite;
  }

  public async patch(patchDto: PatchInviteDto, user: User): Promise<Invite> {
    const { account } = user;

    const invite = await this._inviteRepository.findOne({
      where: { id: patchDto.id, account },
    });

    if (invite.status === InviteStatus.ACCEPTED) {
      throw new BadRequestException(['Invite already accepted']);
    }

    if (invite.status === InviteStatus.CANCELED) {
      throw new BadRequestException(['Invite already canceled']);
    }

    if (invite.status === InviteStatus.DENIED) {
      throw new BadRequestException(['Invite already denied']);
    }

    invite.status = 'status' in patchDto ? patchDto.status : invite.status;
    invite.permissions = 'permissions' in patchDto ? patchDto.permissions : invite.permissions;

    const savedInvite = await this._inviteRepository.save(invite);

    return savedInvite;
  }

  public async resend(resendDto: ResendInviteDto, user: User): Promise<Invite> {
    const { account } = user;

    const invite = await this._inviteRepository.findOne({
      where: { id: resendDto.id, account },
    });

    if (!invite) {
      throw new NotFoundException(['Invite not found']);
    }

    if (invite.status === InviteStatus.ACCEPTED) {
      throw new BadRequestException(['Invite already accepted']);
    }

    invite.status = InviteStatus.PENDING;

    const savedInvite = await this._inviteRepository.save(invite);

    await this._mailerService.sendMail({
      to: savedInvite.email,
      subject: `${user.displayName} invited you to ${this._config.appName} 🤩`,
      template: join(
        __dirname,
        'email-templates',
        'invite-confirmation'
      ),
      context: {
        app: {
          logo: this._config.appLogo,
          name: this._config.appName,
          host: this._config.appHost,
          url: this._config.appBasePath,
        },
        user,
        confirmationUrl: `${this._config.appBasePath}/auth/sign-up?inviteId=${savedInvite.id}&email=${savedInvite.email}`,
      },
    });

    return savedInvite;
  }
}
