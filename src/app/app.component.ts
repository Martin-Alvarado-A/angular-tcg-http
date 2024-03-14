import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  BASE_URL =
    'https://angular-tcg-http-default-rtdb.europe-west1.firebasedatabase.app';
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    console.log(`🔎 | AppComponent | onCreatePost > postData:`, postData);
    // Send Http request
    this.http
      .post(`${this.BASE_URL}/posts.json`, postData)
      .subscribe((responseData) => {
        console.log(
          `🔎 | AppComponent | onCreatePost > responseData:`,
          responseData
        );
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http
      .get(`${this.BASE_URL}/posts.json`)
      .pipe(
        map((responseData) => {
          const postArray = [];
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
        console.log(`🔎 | AppComponent | fetchPosts > posts:`, posts);
      });
  }
}
