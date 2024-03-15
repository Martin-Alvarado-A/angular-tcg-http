import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(`🔎 | LoggingInterceptorService | intercept > URL:`, req.url);
    console.log(
      `🔎 | LoggingInterceptorService | intercept > Headers:`,
      req.headers
    );
    return next.handle(req).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log(
            `🔎 | LoggingInterceptorService | Response > Body:`,
            event.body
          );
        }
      })
    );
  }
}
