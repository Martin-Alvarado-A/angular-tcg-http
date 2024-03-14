import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
    this.http.get(`${this.BASE_URL}/posts.json`).subscribe((posts) => {
      console.log(`🔎 | AppComponent | fetchPosts > posts:`, posts);
    });
  }
}
