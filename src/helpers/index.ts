import { ConflictException } from '@nestjs/common';

export const displayConflictExceptionMessage = (
  error: any,
  message: string,
) => {
  const {
    driverError: { sqlMessage },
  } = error;
  if (sqlMessage.match('Duplicate')) {
    throw new ConflictException(message);
  }
};


