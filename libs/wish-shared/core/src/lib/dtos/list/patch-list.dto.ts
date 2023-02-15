export interface PatchListDto {
  id: string;

  name?: string;

  desc?: string | null;

  bannerId?: string | null;

  profileId?: string | null;

  themeId?: string | null;

  eventDate?: Date | null;

  eventLocation?: string | null;

  pix?: string | null;
}
