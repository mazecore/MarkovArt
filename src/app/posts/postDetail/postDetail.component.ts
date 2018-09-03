import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostsService } from "../posts.service";

@Component({
  templateUrl: 'postDetail.component.html',
  styleUrls: ['postDetail.component.css'],
  selector: 'app-post-detail',
})

export class PostDetailComponent implements OnInit {

  public postId;
  public image;
constructor(private route: ActivatedRoute, public postService: PostsService) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('postId');
  this.postId = id;

  this.postService.getPost(this.postId).subscribe((data) => {
  this.image = data.imagePath;
  });
}

}
