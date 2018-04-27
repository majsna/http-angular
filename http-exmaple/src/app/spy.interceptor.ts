import {HttpInterceptor} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http/src/backend";
import {HttpRequest} from "@angular/common/http/src/request";

export class SpyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    console.log('Request made on: ', new Date());
    console.log('Request url: ', req.url);
    return next.handle(req);
  };

}
