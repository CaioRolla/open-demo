import { ListTheme } from '../../entities/list.entity';
import { GetAllProductDto } from '../product/get-all-product.dto';
import { PublicGetAllPublicProductDto } from '../product/public-get-all-product.dto';

export interface GetPublicListDto {
  id: string;

  name: string;

  slug: string;

  shortUrl: string | null;

  desc: string | null;

  theme: ListTheme;

  profileUrl: string | null;

  bannerUrl: string | null;

  eventDate: Date | null;

  eventLocation: string | null;

  pix: string | null;

  pixCode: string | null;

  pixQr: string | null;

  products: PublicGetAllPublicProductDto[];
}
