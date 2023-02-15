import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { LoginDto } from '../dtos/login.dto';
import { AuthServerService } from '../services/auth-server.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GoogleAuthGuard } from '../guards/google-auth.guard';
import { RegisterDto } from '../dtos/register.dto';
import { ResendRegisterConfirmationDto } from '../dtos/resend-register-confirmation.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { AuthServerConfig } from '../auth-server.config';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly _authServerService: AuthServerService,
    private readonly _config: AuthServerConfig
  ) {}

  @Get('confirm-registration/:confirmationToken')
  @ApiExcludeEndpoint()
  public async confirmRegistration(
    @Param('confirmationToken') confirmationToken: string,
    @Res() res
  ) {
    const data = await this._authServerService.confirmRegistration(confirmationToken);

    return res.redirect(`${this._config.appBasePath}?_token=${data.accessToken}`)
  }

  @Post('login')
  @ApiExcludeEndpoint()
  public async login(@Body() loginDto: LoginDto) {
    return await this._authServerService.login(loginDto);
  }

  @Post('register')
  @ApiExcludeEndpoint()
  public async register(@Body() registerDto: RegisterDto) {
    return await this._authServerService.register(registerDto);
  }

  @Post('resend-register-confirmation')
  @ApiExcludeEndpoint()
  public async resendRegisterConfirmation(
    @Body() resendDto: ResendRegisterConfirmationDto
  ) {
    return await this._authServerService.resendRegisterConfirmation(resendDto);
  }

  @Post('forgot-password')
  @ApiExcludeEndpoint()
  public async forgotPassword(@Body() resendDto: ForgotPasswordDto) {
    return await this._authServerService.forgotPassword(resendDto);
  }

  @Post('reset-password')
  @ApiExcludeEndpoint()
  public async resetPassword(@Body() resetDto: ResetPasswordDto) {
    return await this._authServerService.resetPassword(resetDto);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  public google() {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  public async googleLogin(@Req() req, @Res() res) {
    const data = await this._authServerService.googleLogin(req.user);
    return res.redirect(
      `${process.env.APP_REDIRECT}?_token=${data.accessToken}`
    );
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiExcludeEndpoint()
  public async getMe(@Request() req) {
    return req.user;
  }
}
