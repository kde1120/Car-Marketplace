import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  VEHICLE_CREATION_FAILED = 'VEHICLE_CREATION_FAILED',
  VEHICLE_NOT_FOUND = 'VEHICLE_NOT_FOUND',
  VEHICLE_UPDATE_FAILED = 'VEHICLE_UPDATE_FAILED',
  VEHICLE_DELETE_FAILED = 'VEHICLE_DELETE_FAILED',
  INVALID_INPUT = 'INVALID_INPUT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  // 추가적인 오류 코드들...
}

export const ErrorDetails: Record<
  ErrorCode,
  { message: string; status: HttpStatus }
> = {
  [ErrorCode.VEHICLE_CREATION_FAILED]: {
    message: 'Failed to create vehicle',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorCode.VEHICLE_NOT_FOUND]: {
    message: 'Vehicle not found',
    status: HttpStatus.NOT_FOUND,
  },
  [ErrorCode.VEHICLE_UPDATE_FAILED]: {
    message: 'Failed to update vehicle',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorCode.VEHICLE_DELETE_FAILED]: {
    message: 'Failed to delete vehicle',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  [ErrorCode.INVALID_INPUT]: {
    message: 'Invalid input data',
    status: HttpStatus.BAD_REQUEST,
  },
  [ErrorCode.UNAUTHORIZED]: {
    message: 'Unauthorized access',
    status: HttpStatus.UNAUTHORIZED,
  },
  [ErrorCode.FORBIDDEN]: {
    message: 'Access forbidden',
    status: HttpStatus.FORBIDDEN,
  },
  // 추가적인 오류 세부사항들...
};
