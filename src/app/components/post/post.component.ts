import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  private postService : PostService;
  public posts : Post[] = [];

  public id : number;
  public town : string;
  public capacity : number;
  public postCode : string;
  public editMode : boolean = false;


  constructor(postService : PostService) {
    this.postService = postService;
   }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((postFromApi) =>{
      this.posts = postFromApi;
      this.posts.sort((a, b) => a.town.localeCompare(b.town));
  })
  }
  public addPost(){
    var newPost : Post = {
      id : this.id,
      town : this.town,
      capacity : this.capacity,
      postCode : this.postCode
    }
    this.postService.addPost(newPost).subscribe((postId) =>{
      newPost.id = postId;
      this.posts.push(newPost);
      this.clearForm();
    })
  }
  public clearForm(){
    this.town ="";
    this.capacity = 0;
    this.postCode = "";
  }
  public updatePost(post: Post): void {
    this.editMode = true;
  
    this.id = post.id;
    this.town = post.town;
    this.capacity = post.capacity;
    this.postCode = post.postCode;
  }
  public sendUpdatedPost (){
    var updatedPost: Post = {
      id: this.id,
      town : this.town,
      capacity : this.capacity,
      postCode : this.postCode
    }
    this.postService.updatePost(updatedPost).subscribe(() =>{
      (this.posts = this.posts.map((e) =>
      e.id !== updatedPost.id ? e : updatedPost
      )
      .sort((a, b) => a.town.localeCompare(b.town))
      )       
    })
    this.editMode = false;
    this.clearForm();
  }
  public deletePost(id: number) : void {
    this.postService.deletePost(id).subscribe(() =>{   
    this.posts = this.posts.filter(h => h.id !== id);
    })
  }
}
