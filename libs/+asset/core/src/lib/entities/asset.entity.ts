
export interface Asset {
  id: string;

  url: string;

  token: string | null;

  originalname: string;

  mimeType: string;

  size: number;

  orderIndex: number;

  createdAt: Date;

  updatedAt: Date | null;

  deletedAt: Date | null;
  
  accessUrl: string;
}
