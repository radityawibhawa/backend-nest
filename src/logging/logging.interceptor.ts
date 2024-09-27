import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const wsContext = context.switchToWs();
    const client = wsContext.getClient();
    const data = wsContext.getData();

    // Check if the context is a WebSocket context
    if (client && data){
      return next
        .handle()
        .pipe(
          tap(() => {
            console.log(`Client ID: ${client.id}, Data: ${JSON.stringify(data)}, Time: ${Date.now() - now}ms`);
          }),
        );
    } else {
      return next.handle();
    }
  }
}
