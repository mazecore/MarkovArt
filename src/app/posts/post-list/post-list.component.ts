/*
 * What it does:
 * Renders the list of posts(images with comments)
 * Communicates with the posts.service.ts to access json files from the back-end.
 * Communicates with the search.service.ts to pass the searching parameters from the header searchbar.
 * Implements pagination.
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { SearchService } from "../search.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 12;
  currentPage = 1;
  pageSizeOptions = [8, 12, 24];
  userIsAuthenticated = false;
  userId: string;
  query: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    public router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit() {

    // Authentication and post retrieval

    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.postsUpdated
        .subscribe((postData: { posts: Post[]; postCount: number }) => {
            this.totalPosts = postData.postCount;
            this.posts = postData.posts;
            this.isLoading = false;
          });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
          });
/*
      Communication with the search.service.ts to pass the searching parameters from the header searchbar.
*/
      this.searchService.currentQuery.subscribe(query => this.query = query);
      this.searchService.changeQuery(this.query);
  }

// Navigation to the generated page with details about each post.

  onSelect(post) {
    this.router.navigate([post.id]);
  }

/* Pagination */

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
