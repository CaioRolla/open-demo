import {
  Body,
  Controller,
  Get,
  Req,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { AccountUpgradeQueryDto } from '../dtos/account/account-upgrade-query.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AccountService } from '../services/account.service';

@Controller({
  path: 'account',
  version: '1',
})
export class AccountController {
  constructor(private readonly _accountService: AccountService) {}

  @Get('upgrade')
  @ApiExcludeEndpoint()
  public async upgrade(@Query() query: AccountUpgradeQueryDto, @Res() res) {
    const url = await this._accountService.upgrade(query);
    res.redirect(url);
  }

  @Get('stripe-customer-portal')
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  public async getStripeCustomerPortalURL(@Req() req) {
    return this._accountService.getStripeCustomerPortalURL(req.user);
  }
}
