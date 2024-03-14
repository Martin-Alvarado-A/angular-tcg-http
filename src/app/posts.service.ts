import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
      .post<{ name: string }>(`${this.BASE_URL}/posts.json`, postData)
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

    return this.http
      .get<{ [key: string]: Post }>(`${this.BASE_URL}/posts.json`)
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
        })
      );
  }

  deletePosts() {
    return this.http.delete(`${this.BASE_URL}/posts.json`);
  }
}
