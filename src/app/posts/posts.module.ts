import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { AngularMaterialModule } from "../angular-material.module";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { PostDetailComponent } from "./postDetail/postDetail.component";


@NgModule({
  declarations: [PostCreateComponent, PostListComponent, PostEditComponent, PostDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,

  ]
})
export class PostsModule {}
