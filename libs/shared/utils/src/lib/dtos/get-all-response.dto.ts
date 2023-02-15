export interface GetAllResponseDto<T> {

  totalAmount: number;

  totalPages: number;

  data: T[];

}
