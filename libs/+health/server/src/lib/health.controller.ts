import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller({
  path: 'health',
  version: '1',
})
export class HealthController {

  @Get('ok')
  @ApiOkResponse({ description: `OK` })
  public async ok() {
    return 'OK';
  }
}
