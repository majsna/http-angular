import {Injectable} from '@angular/core';
import {Post} from "./app.component";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class HttpService {

  private postsObs = new BehaviorSubject<Array<Post>>([]);
  posts$ = this.postsObs.asObservable();

  constructor(private http: HttpClient) {
    this.getPosts();
  }

  getPosts() {
    return this.http.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts').subscribe(
      posts => {
        this.postsObs.next(posts);
      },
      error => {
        console.log(error);
      }
    );
  }

  // getPosts(): Observable<Array<Post>> {
  //   return this.http.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts');
  // }

  // getPosts(): Observable<any> {
  //   return this.http.get('https://jsonplaceholder.typicode.com/posts',
  //     {responseType: 'text'});
  // }

  // getPosts(): Observable<HttpResponse<Response>> {
  //   return this.http.get<Response>('https://jsonplaceholder.typicode.com/posts',
  //     {observe: 'response'});
  // }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  getPostByUser(userId: number): Observable<Array<Post>> {
    const par = new HttpParams().set('userId', userId + '');
    return this.http.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts', {params: par})
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>('https://jsonplaceholder.typicode.com/posts', post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>('https://jsonplaceholder.typicode.com/posts/' + post.id, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>('https://jsonplaceholder.typicode.com/posts/' + id);

  }

  changePost(post: Post): Observable<Post> {
    return this.http.patch<Post>('https://jsonplaceholder.typicode.com/posts/' + post.id, post);
  }

}
