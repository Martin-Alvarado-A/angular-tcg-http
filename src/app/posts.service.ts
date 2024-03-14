import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  BASE_URL =
    'https://angular-tcg-http-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) {}

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title: title, content: content };

    this.http
      .post<{ name: string }>(`${this.BASE_URL}/posts.json`, postData)
      .subscribe((responseData) => {
        console.log(
          `🔎 | PostsService | createAndStorePosts > responseData:`,
          responseData
        );
      });
  }

  fetchPosts() {
    console.log(`🔎 | PostsService | fetchPosts`);

    this.http
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
      )
      .subscribe((posts) => {
        console.log(`🔎 | PostsService | fetchPosts > posts:`, posts);
      });
  }
}
