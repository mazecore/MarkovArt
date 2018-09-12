/* Generates a page that appears after you click on a post(image) on the home page */

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostsService } from "../posts.service";

@Component({
  templateUrl: 'postDetail.component.html',
  styleUrls: ['postDetail.component.css'],
  selector: 'app-post-detail',
})

export class PostDetailComponent implements OnInit {

  public postId: string;
  public image: string;
  public title: string;
  public content: string;
  isLoading = false;
constructor(private route: ActivatedRoute, public postService: PostsService) {}

ngOnInit() {
  this.isLoading = true;
  this.route.paramMap.subscribe(params => {
  this.postId = params.get('postId');
});

  this.postService.getPost(this.postId).subscribe((data) => {
  this.image = data.imagePath;
  this.title = data.title;
  this.content = data.content;
  this.isLoading = false;
  });

}

}
