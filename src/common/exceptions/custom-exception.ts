import { HttpException } from '@nestjs/common';
import { ErrorCode, ErrorDetails } from '../enums/error-codes.enum';

export class CustomException extends HttpException {
  constructor(errorCode: ErrorCode, error?: Error) {
    const errorDetail = ErrorDetails[errorCode];
    super(
      {
        message: errorDetail.message,
        error: error?.message,
      },
      errorDetail.status,
    );
  }
}
