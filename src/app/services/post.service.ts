import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private http : HttpClient

  constructor(http : HttpClient) {
    this.http = http;
   }

  public getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>("https://localhost:44368/Post")
  }
  public addPost(post : Post): Observable<number>{
    return this.http.post<number>("https://localhost:44368/Post", post)
  }

  public updatePost(updatedPost:Post): Observable<Post> {
    return this.http.put<Post>("https://localhost:44368/Post", updatedPost);
  }

  public deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`https://localhost:44368/Post/${id}`);
  }
}
