import {Component} from '@angular/core';
import {HttpService} from "./http.service";
import {HttpErrorResponse} from "@angular/common/http";
import 'rxjs/add/operator/retry';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  allPost$: Observable<Array<Post>>;

  constructor(private httpService: HttpService) {
  }

  getPosts() {
    this.allPost$ = this.httpService.posts$;
  }

  // getPosts() {
  //   this.allPost$ = this.httpService.getPosts();
  // }

  // getPosts() {
  //   this.httpService.getPosts().retry(3).subscribe(posts => {
  //       console.log(posts);
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.message);
  //     }
  //   );
  // }

  getPost() {
    this.httpService.getPost(87).subscribe(post => {
        console.log(post);
      }
    )
  }

  getPostByUser() {
    this.httpService.getPostByUser(5).subscribe(posts => {
      console.log(posts);
    })
  }

  addPost() {
    const post: Post = ({
      userId: 1,
      id: null,
      title: 'My post',
      body: 'My first post in angular'
    });

    this.httpService.addPost(post).subscribe(post => {
      console.log(post);
    })

  }

  updatePost() {
    const post: Post = ({
      userId: 1,
      id: 87,
      title: 'Updated post',
      body: 'New post'
    });

    this.httpService.updatePost(post).subscribe(post => {
      console.log(post);
    })
  }

  deletePost() {
    this.httpService.deletePost(87).subscribe(post => {
      console.log(post);
    });
  }

  changePost() {
    const p: Post = ({
      id: 87,
      body: 'I am changing only the body of the post'
    });

    this.httpService.changePost(p).subscribe(post => {
      console.log(post);
    })
  }

}

export interface Post {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}
