/* A hidden page that appears after authentication,
 * where posts can be updated
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: "app-post-edit",
  templateUrl: "./post-edit.component.html",
  styleUrls: ["./post-edit.component.css"]
})
export class PostEditComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 16;
  currentPage = 1;
  pageSizeOptions = [4, 8, 16];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.postsUpdated
          .subscribe((postData: { posts: Post[]; postCount: number }) => {
            this.isLoading = false;
            this.totalPosts = postData.postCount;
            this.posts = postData.posts;
          });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
          .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
          });
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
