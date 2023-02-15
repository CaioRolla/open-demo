import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as _ from 'lodash';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { User, UserBasicPermission, UserStatus } from '@demo/+auth/core';
import { AuthServerConfig } from '../auth-server.config';
import { AccountRepository } from '../repositories/account.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _accountRepository: AccountRepository,
    private readonly _config: AuthServerConfig
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AUTH_JWT_SECRET || 'local',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: User) {
    const userHasDefaultPermissions = _.isEqual(
      _.sortBy(payload.permissions),
      _.sortBy([
        ...this._config.userDefaultPermissions,
        ...Object.values(UserBasicPermission),
      ])
    );

    if (!userHasDefaultPermissions && payload.accountOwner) {
      const user = await this._userRepository.findOne({ id: payload.id });

      user.permissions = [
        ...this._config.userDefaultPermissions,
        ...Object.values(UserBasicPermission),
      ];

      await this._userRepository.save(user);

      throw new UnauthorizedException([
        'Permissions mismatch. Try login again.',
      ]);
    }

    if (payload.status === UserStatus.PENDING_CONFIRMATION) {
      throw new UnauthorizedException(['Email not confirmed']);
    }

    if (!payload.account) {
      throw new UnauthorizedException(['Account not found']);
    }

    
    const adminAccountIdAccess = req.headers['admin-account-id-access'];

    if(payload.admin && adminAccountIdAccess){

      if(!['GET'].includes(req.method)){
        throw new BadRequestException(['Admins can\'t change stuff']);
      }

      const account = await this._accountRepository.findOne({ where: { id: adminAccountIdAccess } });

      if (!account) {
        throw new UnauthorizedException(['Account not found']);
      }

      return { ...{...payload, account}, iat: undefined, exp: undefined };
    }

    return { ...payload, iat: undefined, exp: undefined };
  }
}
