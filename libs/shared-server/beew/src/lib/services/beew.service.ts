import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CreateScheduleDto } from '@demo/cron-shared/core';
import { SharedServerBeewConfig } from '../shared-server-beew.config';
import { catchError, tap } from 'rxjs';

@Injectable()
export class BeewService {
  constructor(
    private readonly _config: SharedServerBeewConfig,
    private readonly _http: HttpService
  ) {}

  public async createSchedule(createDto: CreateScheduleDto): Promise<any> {
    return await this._http
      .post('https://server.beew.io/api/v1/schedule', createDto, {
        headers: {
          'X-API-KEY': this._config.apiKey,
        },
      })
      .toPromise();
  }
}
