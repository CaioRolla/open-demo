import { HttpErrorResponse } from '@angular/common/http';

import { ErrorResponseDto } from '../dtos/error-response.dto';

export const fetchDataHandler = <T>(res: any): T => {
    // return camelcaseKeys(res, { deep: true }) as T;
    return res;
};

export const errorHandler = (err: HttpErrorResponse): ErrorResponseDto => {
    const error: ErrorResponseDto = err.error;
    error.status = err.status;
    return error;
};
