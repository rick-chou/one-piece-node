import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const error: any = exception.getResponse();

    let message = `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    if (error) {
      message =
        typeof error === 'string'
          ? error
          : typeof error.message === 'string'
          ? error.message
          : error.message[0];
    }

    const errorResponse = {
      data: null,
      message,
      code: status,
    };

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
