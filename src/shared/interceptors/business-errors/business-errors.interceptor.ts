import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class BusinessErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        if (this.isBusinessError(error)) {
          switch (error.type) {
            case BusinessError.NOT_FOUND:
              throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            case BusinessError.PRECONDITION_FAILED:
              throw new HttpException(
                error.message,
                HttpStatus.PRECONDITION_FAILED,
              );
            case BusinessError.BAD_REQUEST:
              throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
          }
        }

        throw error;
      }),
    );
  }

  private isBusinessError(
    error: unknown,
  ): error is { type: BusinessError; message: string } {
    return (
      typeof error === 'object' &&
      error !== null &&
      'type' in error &&
      'message' in error
    );
  }
}
