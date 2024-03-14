import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';

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

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    console.log(`🔎 | AppComponent | onCreatePost > postData:`, postData);
    // Send Http request
    this.postService.createAndStorePosts(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;

    this.postService.fetchPosts().subscribe((posts) => {
      console.log(`🔎 | AppComponent | onFetchPosts > posts:`, posts);
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    // Send Http request
  }
}
