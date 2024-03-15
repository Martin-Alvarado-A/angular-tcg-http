import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  BASE_URL =
    'https://angular-tcg-http-default-rtdb.europe-west1.firebasedatabase.app';
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    this.http
      .post<{ name: string }>(`${this.BASE_URL}/posts.json`, postData, {
        observe: 'response',
      })
      .subscribe(
        (responseData) => {
          console.log(
            `🔎 | PostsService | createAndStorePosts > responseData:`,
            responseData
          );
        },
        (error: HttpErrorResponse) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    console.log(`🔎 | PostsService | fetchPosts`);

    let searchParams = new HttpParams();
    searchParams = searchParams.set('print', 'pretty');
    searchParams = searchParams.set('custom', 'key'); // Not a real param

    return this.http
      .get<{ [key: string]: Post }>(`${this.BASE_URL}/posts.json`, {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello',
        }),
        params: searchParams,
        responseType: 'json',
      })
      .pipe(
        map((responseData) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (Object.prototype.hasOwnProperty.call(responseData, key)) {
              const element = responseData[key];
              postArray.push({ ...element, id: key });
            }
          }
          return postArray;
        }),
        catchError((errorRes) => {
          // Send to analitycs server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(`${this.BASE_URL}/posts.json`, {
        observe: 'events',
        responseType: 'text',
      })
      .pipe(
        tap((event) => {
          console.log(`🔎 | PostsService  | deletePosts > event:`, event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(`🔎 | PostsService  | deletePosts > body:`, event.body);
          }
        })
      );
  }
}
