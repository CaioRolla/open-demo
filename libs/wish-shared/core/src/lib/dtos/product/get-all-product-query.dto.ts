import { GetAllQueryDto, GetAllResponseDto } from '@demo/shared/utils';

export interface GetAllProductQueryDto extends GetAllQueryDto {
  listId: string | null;
}
