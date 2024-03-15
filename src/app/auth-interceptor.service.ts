import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(
      `🔎 | AuthInterceptorService | intercept: Request is on its way!`
    );
    console.log(`🔎 | AuthInterceptorService | intercept > url:`, req.url);
    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'xyz'), // Not a real header
    });
    return next.handle(modifiedRequest);
  }
}
