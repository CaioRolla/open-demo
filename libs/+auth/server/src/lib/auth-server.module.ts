import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './controllers/auth.controller';
import { AuthServerService } from './services/auth-server.service';
import { PassportModule } from '@nestjs/passport';
import { UserEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import {
  UserRepository,
  UserRepositoryProvider,
} from './repositories/user.repository';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthServerConfig } from './auth-server.config';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { ApiKeyAuthGuard } from './guards/api-key-auth.guard';
import { JwtOrApiKeyAuthGuard } from './guards/jwt-or-api-key-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AccountRepositoryProvider } from './repositories/account.repository';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { InviteRepositoryProvider } from './repositories/invite.repository';
import { InviteController } from './controllers/invite.controller';
import { InviteService } from './services/invite.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.AUTH_JWT_SECRET || 'local',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [
    AuthController,
    AccountController,
    InviteController,
    UserController,
  ],
  providers: [
    AuthServerService,
    ApiKeyStrategy,
    UserRepositoryProvider,
    AccountRepositoryProvider,
    InviteRepositoryProvider,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    GoogleStrategy,
    GoogleAuthGuard,
    ApiKeyAuthGuard,
    JwtAuthGuard,
    JwtOrApiKeyAuthGuard,
    AccountService,
    InviteService,
    UserService,
  ],
  exports: [UserRepository, AccountRepositoryProvider],
})
export class AuthServerModule {
  static forRoot(config: AuthServerConfig): DynamicModule {
    return {
      module: AuthServerModule,
      providers: [
        {
          provide: AuthServerConfig,
          useValue: config,
        },
      ],
    };
  }
}
