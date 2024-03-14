import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    console.log(`🔎 | AppComponent | onCreatePost > postData:`, postData);
    // Send Http request
    this.http
      .post(
        'https://angular-tcg-http-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(
          `🔎 | AppComponent | onCreatePost > responseData:`,
          responseData
        );
      });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
}
