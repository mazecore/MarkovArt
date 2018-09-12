 // Module that imports modules and componenets that are used to create and edit posts.

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { AngularMaterialModule } from "../angular-material.module";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { PostDetailComponent } from "./postDetail/postDetail.component";
import { SerchPipe } from "./searchfilter.pipe";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [PostCreateComponent, PostListComponent, PostEditComponent, PostDetailComponent, SerchPipe],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PostsModule {}
