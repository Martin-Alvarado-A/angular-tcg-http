import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(
      `🔎 | AuthInterceptorService | intercept:`,
      ' Request is on its way!'
    );
    console.log(`🔎 | AuthInterceptorService | intercept > url:`, req.url);
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz'), // Not a real header
    });

    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        console.log(`🔎 | AuthInterceptorService | tap > event:`, event);
        if (event.type === HttpEventType.Response) {
          console.log(
            `🔎 | AuthInterceptorService | tap > body Data:`,
            event.body
          );
        }
      })
    );
  }
}
