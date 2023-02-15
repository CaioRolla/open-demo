export interface PatchProductDto {
  id: string;

  name?: string;

  desc?: string | null;

  url?: string | null;

  imagesIds?: string[] | null;

  personId?: string | null;

  estimatedPrice?: number | null;
}
