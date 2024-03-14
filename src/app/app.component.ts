import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  BASE_URL =
    'https://angular-tcg-http-default-rtdb.europe-west1.firebasedatabase.app';
  loadedPosts: Post[] = [];
  isFetching = false;
  errorMsg: string = null;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    console.log(`🔎 | AppComponent | onCreatePost > postData:`, postData);
    this.postService.createAndStorePosts(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isFetching = true;

    this.postService.fetchPosts().subscribe(
      (posts) => {
        console.log(`🔎 | AppComponent | onFetchPosts > posts:`, posts);
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error: HttpErrorResponse) => {
        console.log(`🔎 | AppComponent | onFetchPosts > ERROR:`, error);
        this.errorMsg = `${error.status}: ${error.error.error}`;
      }
    );
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(() => {
      console.log(`🔎 | AppComponent | onClearPosts`);
      this.loadedPosts = [];
    });
  }
}
