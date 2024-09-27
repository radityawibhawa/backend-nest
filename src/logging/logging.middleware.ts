import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    console.log(`Method : ${req.method}`);
    console.log(`URL : ${req.originalUrl}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    next();
  }
}
