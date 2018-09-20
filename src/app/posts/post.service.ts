import {
  Post
} from "./post.model";
import {
  Injectable
} from "@angular/core";
import {
  Subject
} from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {}
  private posts: Post[] = [];
  private postsUpdated = new Subject < Post[] > ();

  getPosts() {
    //copy the original array in a new one.
    //return [...this.posts];
    this.http.get < {
      message: string,
      data: Post[]
    } > ('http://localhost:3000/api/posts').subscribe((postData) => {
      this.posts = postData.data;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    /*const post: Post = {
      title: title,
      content: content
    };*/
    this.http.post < {
      message: string
    } > ('http://localhost:3000/api/posts', post).subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }
}
