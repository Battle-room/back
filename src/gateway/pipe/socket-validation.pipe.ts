import { ValidationPipe, ValidationError } from '@nestjs/common';

export function SocketValidationPipe() {
  return new ValidationPipe({
    transform: true,
    exceptionFactory: (errors: ValidationError[]) => {
      const messages = `Error during validating data in socket`;
      console.log(messages);
      return;
    },
  });
}
