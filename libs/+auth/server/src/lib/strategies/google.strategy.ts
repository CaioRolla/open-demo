import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy } from 'passport-google-oauth20';

import { AuthServerService } from '../services/auth-server.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly _authServerService: AuthServerService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  authenticate(req: any, options: any): any {
    super.authenticate(
      req,
      Object.assign(options, {
        state: JSON.stringify({...req.query}),
      })
    );
  }

  async validate(req, accessToken: string, refreshToken: string, profile: any) {
    const state = JSON.parse(req.query.state);

    return await this._authServerService.validateGoogleUser(
      profile,
      accessToken,
      refreshToken,
      state['inviteId']
    );
  }
}
