import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  BASE_URL =
    'https://angular-tcg-http-default-rtdb.europe-west1.firebasedatabase.app';
  private errorSub: Subscription;
  loadedPosts: Post[] = [];
  isFetching = false;
  errorMsg: string = null;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe((errorMsg: string) => {
      this.errorMsg = errorMsg;
    });

    this.onFetchPosts();
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
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
